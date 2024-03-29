import React, { Component } from "react";
import {
    ActivityIndicator,
    Animated,
    Easing,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import PropTypes from "prop-types";

import { Search, Select } from "../../molecules";

export class Listing extends Component {
    static get propTypes() {
        return {
            getItems: PropTypes.func,
            itemsRequestLimit: PropTypes.number,
            itemsRefreshMinimum: PropTypes.number,
            renderItem: PropTypes.func.isRequired,
            renderContentRefreshing: PropTypes.func,
            renderLoadingFooter: PropTypes.func,
            renderFooter: PropTypes.func,
            renderEmptyList: PropTypes.func,
            filters: PropTypes.array,
            filtersValue: PropTypes.object,
            itemsSortField: PropTypes.string,
            itemsSortReverse: PropTypes.bool,
            emptyItemsText: PropTypes.string,
            search: PropTypes.bool,
            loading: PropTypes.bool,
            refreshing: PropTypes.bool,
            searchPlaceholder: PropTypes.string,
            searchHeaderLayout: PropTypes.oneOf(["horizontal", "vertical"]),
            expandableSearchBar: PropTypes.bool,
            expandAnimationDuration: PropTypes.number,
            flatListProps: PropTypes.object,
            onEndReachedThreshold: PropTypes.number,
            onFilter: PropTypes.func,
            onSearch: PropTypes.func,
            onSearchBlur: PropTypes.func,
            onSearchFocus: PropTypes.func,
            onRefreshComplete: PropTypes.func,
            loadingColor: PropTypes.string,
            style: PropTypes.any,
            scrollViewStyle: PropTypes.any,
            scrollViewContainerStyle: PropTypes.any,
            searchingHeaderStyle: PropTypes.any,
            searchStyle: PropTypes.any,
            filtersStyle: PropTypes.any,
            listingContentStyle: PropTypes.any,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            items: [],
            itemsRequestLimit: 15,
            itemsRefreshMinimum: 8,
            filters: [],
            filtersValue: {},
            emptyItemsText: "No items",
            search: true,
            loading: false,
            refreshing: false,
            searchPlaceholder: "Search",
            searchHeaderLayout: "horizontal",
            expandableSearchBar: false,
            expandAnimationDuration: 200,
            flatListProps: {},
            onFilter: async () => {},
            onSearch: async () => {},
            onSearchBlur: async () => {},
            onSearchFocus: async () => {},
            loadingColor: "#808080",
            style: {},
            scrollViewStyle: {},
            scrollViewContainerStyle: {},
            searchingHeaderStyle: {},
            searchStyle: {},
            filtersStyle: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            searchWidth: new Animated.Value(0),
            placeholderColorAlpha: 1,
            expanded: false,
            searchText: "",
            itemsOffset: 0,
            filters: this.props.filtersValue,
            loading: false,
            searchLoaded: false,
            refreshing: false,
            end: false,
            items: []
        };

        this.scrollViewWidth = 0;
        this.searchHeaderWidth = 0;
        this.minFiltersWidth = 42;
    }

    async componentDidMount() {
        await this.refresh();
    }

    async refresh(scrollToTop = false) {
        if (!this.props.getItems) return;

        if (scrollToTop) this.scrollToTop();
        this.setState({ refreshing: true, itemsOffset: 0, end: false }, async () => {
            const items = await this._getItems();
            this.setState(
                {
                    items: items,
                    refreshing: false
                },
                this.onRefreshComplete
            );
        });
    }

    scrollToTop = () => {
        if (!this.flatListRef) return;
        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    };

    addItems = (items, addToStart = false) => {
        this.setState(prevState => ({
            items: addToStart ? [...items, ...prevState.items] : [...prevState.items, ...items]
        }));
    };

    onSelectUpdateValue(key, value) {
        this.setState(
            ({ filters }) => ({ filters: { ...filters, [key]: value } }),
            async () => await this.onFilter(this.state.filters)
        );
    }

    onRefreshComplete = async () => {
        const shouldLoadMore = this.state.items.length < this.props.itemsRefreshMinimum;
        if (shouldLoadMore) await this._loadMoreItems();
        if (this.props.onRefreshComplete) this.props.onRefreshComplete();
    };

    onSearch = async value => {
        await this.props.onSearch(value);
        this.setState({ searchText: value }, async () => await this.refresh(true));
    };

    onSearchFocus = async value => {
        await this.props.onSearchFocus(value);
        if (this.props.expandableSearchBar && this._isHorizontalLayout())
            await this._expandSearchBar();
    };

    onSearchBlur = async value => {
        await this.props.onSearchBlur(value);
        if (this.props.expandableSearchBar && this._isHorizontalLayout())
            await this._shrinkSearchBar();
    };

    onFilter = async value => {
        await this.props.onFilter(value);
        this.setState({ filters: value }, async () => await this.refresh(true));
    };

    onRefresh = async () => {
        await this.refresh();
    };

    onEndReached = async () => {
        // in case the end of the lazy loading of the elements has
        // been reached then there's nothing to be loaded
        if (!this.props.getItems || this.state.end) return;
        await this._loadMoreItems();
    };

    _loadMoreItems = async () => {
        return new Promise((resolve, reject) => {
            this.setState(
                ({ itemsOffset }) => ({
                    itemsOffset: itemsOffset + this.props.itemsRequestLimit,
                    loading: true
                }),
                async () => {
                    try {
                        // gathers the new orders from the server side using the
                        // current base offset and base start order ID as the
                        // reference for the retrieval of new orders
                        const newItems = await this._getItems();

                        // in case no more orders are found then marks the end
                        // of the list paging and returns the control flow, as
                        // there's nothing remaining to be done
                        if (newItems.length === 0) {
                            this.setState({ end: true });
                            return;
                        }

                        this.setState(({ items }) => ({
                            items: items.concat(newItems)
                        }));
                    } catch (error) {
                        reject(error);
                    } finally {
                        this.setState({ loading: false }, resolve);
                    }
                }
            );
        });
    };

    _getItems = async (options = {}) => {
        const items = await this.props.getItems(
            {
                start: this.state.itemsOffset,
                limit: this.props.itemsRequestLimit,
                filter: this.state.searchText,
                sort: this.props.itemsSortField,
                reverse: this.props.itemsSortReverse,
                ...options
            },
            { extraFilters: this._buildExtraFilters() }
        );
        return items;
    };

    _buildExtraFilters() {
        return Object.values(this.state.filters).filter(f => Boolean(f));
    }

    _onScrollViewLayout(event) {
        if (this.state.searchLoaded) return;
        this.scrollViewWidth = event.nativeEvent.layout.width;
        this.setState({ searchLoaded: this.scrollViewWidth !== 0 && this.searchHeaderWidth !== 0 });
    }

    _onSearchHeaderViewLayout(event) {
        if (this.state.searchLoaded) return;
        this.searchHeaderWidth = event.nativeEvent.layout.width;
        this.setState({ searchLoaded: this.scrollViewWidth !== 0 && this.searchHeaderWidth !== 0 });
    }

    _expandSearchBar() {
        // set select text as transparent
        this.setState({ placeholderColorAlpha: 0 });

        // animate search bar width to maximum
        // and decrease dropdown select width
        Animated.timing(this.state.searchWidth, {
            toValue: 1,
            duration: this.props.expandAnimationDuration,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease)
        }).start(() => {
            this.setState({ expanded: true });
        });
    }

    _shrinkSearchBar() {
        // animate search bar width to normal
        // and increase dropdown select width
        Animated.timing(this.state.searchWidth, {
            toValue: 0,
            duration: this.props.expandAnimationDuration,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease)
        }).start(() => {
            this.setState({
                expanded: false,
                placeholderColorAlpha: 1
            });
        });
    }

    _isHorizontalLayout = () => this.props.searchHeaderLayout === "horizontal";

    _style() {
        return [styles.listing, this.props.style];
    }

    _searchingHeaderStyle() {
        const isHorizontal = this._isHorizontalLayout();
        const layoutStyle = isHorizontal
            ? styles.searchingHeaderHorizontal
            : styles.searchingHeaderVertical;
        const height = {
            minHeight: !isHorizontal && this.props.search ? 100 : 50
        };
        return [styles.searchingHeader, layoutStyle, height, this.props.searchingHeaderStyle];
    }

    _scrollViewStyle = () => {
        return [styles.scrollView, this.props.scrollViewStyle];
    };

    _scrollViewContainerStyle = () => {
        return [styles.scrollViewContainer, this.props.scrollViewContainerStyle];
    };

    _searchStyle = () => {
        const isHorizontal = this._isHorizontalLayout();
        const layoutStyle = isHorizontal ? styles.searchHorizontal : styles.searchVertical;
        const animationStyle =
            isHorizontal && this.props.expandableSearchBar
                ? {
                      width: this.state.searchWidth.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                              this.searchHeaderWidth / 2,
                              this.searchHeaderWidth - this.minFiltersWidth
                          ]
                      })
                  }
                : {};
        return [layoutStyle, animationStyle, this.props.searchStyle];
    };

    _filtersStyle = () => {
        const isHorizontal = this._isHorizontalLayout();
        const layoutStyle = isHorizontal ? styles.filtersHorizontal : styles.filtersVertical;
        const animationStyle =
            isHorizontal && this.props.expandableSearchBar
                ? {
                      width: this.state.searchWidth.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                              this.props.search
                                  ? this.searchHeaderWidth / 2
                                  : this.searchHeaderWidth,
                              this.minFiltersWidth
                          ]
                      }),
                      paddingLeft: this.props.search ? 5 : 0
                  }
                : {};
        return [layoutStyle, animationStyle, this.props.filtersStyle];
    };

    _listingStyle() {
        return [styles.listingContent, this.props.listingContentStyle];
    }

    /**
     * The placeholder text in the `<Select />` component can not
     * have opacity applied, otherwise the entire select is affected.
     * This way we change only the text color and by reducing the alpha
     * channel we get the same effect as reducing the opacity.
     */
    _selectTextColor = () => `rgba(36,66,90,${this.state.placeholderColorAlpha})`;

    /**
     * Notice this does not follow the ReactNative style standard
     * where you can give an array of styles and it merges them.
     * This object is simply spread onto the actual styles used by
     * the `<Select />` component.
     */
    _selectPickerAndroidStyle = () => {
        return {
            ...styles.selectPickerAndroid,
            color: this._selectTextColor()
        };
    };

    /**
     * Notice this does not follow the ReactNative style standard
     * where you can give an array of styles and it merges them.
     * This object is simply spread onto the actual styles used by
     * the `<Select />` component.
     */
    _selectPickerIOSStyle = () => {
        return {
            ...styles.selectPickerIOS,
            color: this._selectTextColor()
        };
    };

    /**
     * Notice this does not follow the ReactNative style standard
     * where you can give an array of styles and it merges them.
     * This object is simply spread onto the actual styles used by
     * the `<Select />` component.
     */
    _selectPlaceholderStyle = () => {
        return {
            color: this._selectTextColor()
        };
    };

    _renderSearch() {
        if (!this.props.search) return;
        return (
            <Search
                style={this._searchStyle()}
                placeholder={this.props.searchPlaceholder}
                onValue={this.onSearch}
                onFocus={this.onSearchFocus}
                onBlur={this.onSearchBlur}
            />
        );
    }

    _renderFilters() {
        if (this.props.filters.length === 0) return;

        return (
            <Animated.View style={this._filtersStyle()}>
                <ScrollView
                    style={this._scrollViewStyle()}
                    onLayout={event => this._onScrollViewLayout(event)}
                    contentContainerStyle={this._scrollViewContainerStyle()}
                    horizontal={true}
                    directionalLockEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View ref={el => (this.selectContainerRef = el)} style={styles.selectContainer}>
                        {this._renderSelects()}
                    </View>
                </ScrollView>
            </Animated.View>
        );
    }

    _renderSelects = () => {
        return this.props.filters.map((item, index) => {
            const isLastChild = index === this.props.filters.length - 1;
            const staticSize =
                this.props.filters.length > 3 ? (this.scrollViewWidth - 10) / 3 : undefined;
            return (
                <Select
                    style={isLastChild ? styles.selectLastChild : styles.select}
                    placeholderStyle={this._selectPlaceholderStyle()}
                    iconContainerStyle={styles.selectIconContainer}
                    inputAndroidStyle={this._selectPickerAndroidStyle()}
                    inputIOSStyle={this._selectPickerIOSStyle()}
                    inputIOSContainerStyle={this._selectPickerIOSStyle()}
                    placeholder={item.placeholder}
                    options={item.options}
                    value={this.state.filters[item.value]}
                    icon="filter"
                    onUpdateValue={value => this.onSelectUpdateValue(item.value, value)}
                    width={staticSize || item.width}
                    key={item.value}
                />
            );
        });
    };

    _renderEmptyList = () => {
        if (this.state.loading || this.state.refreshing) return null;

        if (this.props.renderEmptyList) return this.props.renderEmptyList();
        return (
            <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>{this.props.emptyItemsText}</Text>
            </View>
        );
    };

    _renderListing = () => {
        return (
            <FlatList
                ref={el => (this.flatListRef = el)}
                key={"items"}
                style={this._listingStyle()}
                data={this.state.items}
                refreshing={this.props.refreshing && this.state.refreshing}
                onRefresh={this.onRefresh}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={this.props.onEndReachedThreshold}
                renderItem={({ item, index }) => this.props.renderItem(item, index)}
                keyExtractor={item => String(item.id)}
                ListEmptyComponent={this._renderEmptyList()}
                ListFooterComponent={this._renderFooter()}
                {...this.props.flatListProps}
                contentContainerStyle={{}}
            />
        );
    };

    _renderHeader = () => {
        if (!this.props.search || this.props.filters.length === 0) return;
        return (
            <View
                style={this._searchingHeaderStyle()}
                onLayout={event => this._onSearchHeaderViewLayout(event)}
            >
                {this._renderSearch()}
                {this._renderFilters()}
            </View>
        );
    };

    _renderContent = () => {
        if (this.state.refreshing && this.props.renderContentRefreshing) {
            return this.props.renderContentRefreshing();
        }
        return this._renderListing();
    };

    _renderFooter = () => {
        if (this.state.loading || this.props.loading) {
            return this._renderLoadingFooter();
        } else if (this.state.end) {
            return this._renderLoadingEndedFooter();
        }
    };

    _renderLoadingFooter = () => {
        if (this.props.renderLoadingFooter) {
            return this.props.renderLoadingFooter();
        }
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator
                    style={styles.loadingIndicator}
                    size="large"
                    color={this.props.loadingColor}
                    animating={true}
                />
            </View>
        );
    };

    _renderLoadingEndedFooter = () => {
        if (this.props.renderFooter) {
            return this.props.renderFooter();
        }
    };

    render() {
        return (
            <View style={this._style()}>
                {this._renderHeader()}
                {this._renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listing: {
        flex: 1,
        backgroundColor: "#f6f7f9"
    },
    listingContent: {
        height: "100%",
        backgroundColor: "#f6f7f9"
    },
    searchingHeader: {
        flex: 1,
        marginBottom: -2,
        marginTop: 8,
        padding: 0
    },
    searchingHeaderVertical: {
        flexDirection: "column",
        marginHorizontal: 0
    },
    searchingHeaderHorizontal: {
        flexDirection: "row",
        minHeight: 50,
        marginHorizontal: 15
    },
    searchVertical: {
        marginBottom: 10,
        marginHorizontal: 15
    },
    searchHorizontal: {
        alignItems: "flex-start",
        paddingRight: 5
    },
    filtersVertical: {
        marginHorizontal: 15
    },
    filtersHorizontal: {
        alignItems: "flex-start"
    },
    scrollViewContainer: {
        height: 46,
        marginBottom: 10,
        minWidth: "100%"
    },
    selectContainer: {
        flexDirection: "row",
        minWidth: "100%"
    },
    select: {
        flex: 1,
        marginRight: 5
    },
    selectIconContainer: {
        right: 8
    },
    selectPickerAndroid: {
        paddingLeft: 15,
        paddingRight: 0
    },
    selectPickerIOS: {
        paddingLeft: 15,
        paddingRight: 0
    },
    selectLastChild: {
        flex: 1
    },
    loadingContainer: {
        height: 79
    },
    loadingIndicator: {
        position: "absolute",
        top: 19,
        left: 0,
        right: 0
    },
    emptyList: {
        alignItems: "center",
        paddingVertical: 10
    },
    emptyListText: {
        marginTop: 20,
        color: "#a4adb5",
        fontSize: 25
    }
});
