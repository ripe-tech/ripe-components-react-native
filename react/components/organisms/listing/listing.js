import React, { Component } from "react";
import {
    ActivityIndicator,
    Animated,
    Easing,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

import { Search, Select } from "../../molecules";

export class Listing extends Component {
    static get propTypes() {
        return {
            getItems: PropTypes.func,
            itemsRequestLimit: PropTypes.number,
            renderItem: PropTypes.func.isRequired,
            filters: PropTypes.array,
            filtersValue: PropTypes.object,
            itemsSortField: PropTypes.string,
            itemsSortReverse: PropTypes.bool,
            emptyItemsText: PropTypes.string,
            search: PropTypes.bool,
            loading: PropTypes.bool,
            refreshing: PropTypes.bool,
            layout: PropTypes.oneOf(["horizontal", "vertical"]),
            expandSearchBar: PropTypes.bool,
            flatListProps: PropTypes.object,
            onEndReachedThreshold: PropTypes.number,
            onFilter: PropTypes.func,
            onSearch: PropTypes.func,
            onSearchBlur: PropTypes.func,
            onSearchFocus: PropTypes.func,
            style: ViewPropTypes.style,
            scrollViewStyle: ViewPropTypes.style,
            scrollViewContainerStyle: ViewPropTypes.style,
            searchingHeaderStyle: ViewPropTypes.style,
            searchStyle: ViewPropTypes.style,
            filtersStyle: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            items: [],
            itemsRequestLimit: 15,
            filters: [],
            filtersValue: {},
            emptyItemsText: "No items",
            search: true,
            loading: false,
            refreshing: false,
            layout: "horizontal",
            expandSearchBar: false,
            flatListProps: {},
            onFilter: async () => {},
            onSearch: async () => {},
            onSearchBlur: async () => {},
            onSearchFocus: async () => {},
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
            searchText: "",
            itemsOffset: 0,
            filters: this.props.filtersValue,
            loading: false,
            searchLoaded: false,
            refreshing: false,
            end: false,
            items: []
        };
        this.animating = false;

        this.scrollViewWidth = 0;
    }

    async componentDidMount() {
        await this.refresh();
    }

    async refresh() {
        if (!this.props.getItems) return;

        this.scrollToTop();
        this.setState({ refreshing: true, itemsOffset: 0, end: false }, async () => {
            const items = await this._getItems();
            this.setState({
                items: items,
                refreshing: false
            });
        });
    }

    scrollToTop = () => {
        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    };

    onSelectUpdateValue(key, value) {
        this.setState(
            ({ filters }) => ({ filters: { ...filters, [key]: value } }),
            async () => await this.onFilter(this.state.filters)
        );
    }

    onSearch = async value => {
        await this.props.onSearch(value);
        this.setState({ searchText: value }, async () => await this.refresh());
    };

    onSearchFocus = async value => {
        await this.props.onSearchFocus(value);
        if (this.props.expandSearchBar) await this._expandSearchBar();
    };

    onSearchBlur = async value => {
        await this.props.onSearchBlur(value);
        if (this.props.expandSearchBar) await this._shrinkSearchBar();
    };

    onFilter = async value => {
        await this.props.onFilter(value);
        this.setState({ filters: value }, async () => await this.refresh());
    };

    onRefresh = async () => {
        await this.refresh();
    };

    onEndReached = async () => {
        // in case the end of the lazy loading of the elements has
        // been reached then there's nothing to be loaded
        if (!this.props.getItems || this.state.end) return;

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
                } finally {
                    this.setState({ loading: false });
                }
            }
        );
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
        this.setState({ searchLoaded: true });
    }

    _expandSearchBar() {
        this.animating = true;
        Animated.timing(this.state.searchWidth, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease)
        }).start(() => {
            this.animating = false;
        });
    }

    _shrinkSearchBar() {
        this.animating = true;
        Animated.timing(this.state.searchWidth, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease)
        }).start(() => {
            this.animating = false;
        });
    }

    _style() {
        return [styles.listing, this.props.style];
    }

    _searchingHeaderStyle() {
        const layoutStyle =
            this.props.layout === "horizontal"
                ? styles.searchingHeaderHorizontal
                : styles.searchingHeaderVertical;
        return [styles.searchingHeader, layoutStyle, this.props.searchingHeaderStyle];
    }

    _scrollViewStyle = () => {
        return [styles.scrollView, this.props.scrollViewStyle];
    };

    _scrollViewContainerStyle = () => {
        return [styles.scrollViewContainer, this.props.scrollViewContainerStyle];
    };

    _searchStyle = () => {
        const layoutStyle =
            this.props.layout === "horizontal" ? styles.searchHorizontal : styles.searchVertical;

        const animationStyle = this.props.expandSearchBar
            ? {
                  width: this.state.searchWidth.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["50%", "100%"]
                  })
              }
            : {};

        return [layoutStyle, animationStyle, this.props.searchStyle];
    };

    _filtersStyle = () => {
        const layoutStyle =
            this.props.layout === "horizontal" ? styles.filtersHorizontal : styles.filtersVertical;

        const animationStyle = this.props.expandSearchBar
            ? {
                  width: this.state.searchWidth.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["50%", "0%"]
                  })
              }
            : {};

        return [layoutStyle, animationStyle, this.props.filtersStyle];
    };

    _renderSearch() {
        if (!this.props.search) return;

        return (
            <Search
                style={this._searchStyle()}
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
                    onLayout={event => this._onScrollViewLayout(event)}
                    style={this._scrollViewStyle()}
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
                    placeholder={item.placeholder}
                    options={item.options}
                    value={this.state.filters[item.value]}
                    onUpdateValue={value => this.onSelectUpdateValue(item.value, value)}
                    width={staticSize || item.width}
                    key={item.value}
                />
            );
        });
    };

    _renderEmptyList = () => {
        if (this.state.loading || this.state.refreshing) return null;

        return (
            <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>{this.props.emptyItemsText}</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={this._style()}>
                <View style={this._searchingHeaderStyle()}>
                    {this._renderSearch()}
                    {this._renderFilters()}
                </View>
                <FlatList
                    ref={el => (this.flatListRef = el)}
                    key={"items"}
                    style={styles.flatList}
                    data={this.state.items}
                    refreshing={this.props.refreshing && this.state.refreshing}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={this.props.onEndReachedThreshold}
                    renderItem={({ item, index }) => this.props.renderItem(item, index)}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={this._renderEmptyList()}
                    ListFooterComponent={<View style={styles.flatListBottom} />}
                    {...this.props.flatListProps}
                />
                {this.props.loading && this.state.loading && (
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size="large"
                        color="#6687f6"
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listing: {
        flex: 1,
        backgroundColor: "#f6f7f9"
    },
    searchingHeader: {
        flex: 1
    },
    searchingHeaderVertical: {
        flexDirection: "column",
        minHeight: 100,
        marginVertical: 8,
        marginHorizontal: 0,
        padding: 0
    },
    searchingHeaderHorizontal: {
        flexDirection: "row",
        minHeight: 50,
        marginVertical: 8,
        marginHorizontal: 15,
        padding: 0
    },
    searchVertical: {
        marginBottom: 10,
        marginHorizontal: 15
    },
    searchHorizontal: {
        width: "50%",
        height: "100%",
        alignItems: "flex-start",
        paddingRight: 5
    },
    filtersVertical: {
        marginHorizontal: 15
    },
    filtersHorizontal: {
        width: "50%",
        height: "100%",
        alignItems: "flex-start",
        paddingLeft: 5
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
    selectLastChild: {
        flex: 1
    },
    flatList: {
        height: "100%"
    },
    loadingIndicator: {
        position: "absolute",
        bottom: 20,
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
