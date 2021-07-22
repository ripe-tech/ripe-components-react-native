import React, { Component } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { Search, Select } from "../../molecules";

export class Listing extends Component {
    static get propTypes() {
        return {
            items: PropTypes.array.isRequired,
            getItems: PropTypes.func,
            renderItem: PropTypes.func.isRequired,
            filters: PropTypes.array,
            filtersValue: PropTypes.object,
            emptyItemsText: PropTypes.string,
            loading: PropTypes.bool,
            flatListProps: PropTypes.object,
            onSearch: PropTypes.func,
            onFilter: PropTypes.func,
            onRefresh: PropTypes.func,
            onEndReached: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            itemsRequestLimit: 15,
            loading: false,
            end: false,
            searchText: "",
            items: [],
            filters: [],
            filtersValue: {},
            emptyItemsText: "No items",
            flatListProps: {},
            onSearch: async () => {},
            onFilter: async () => {},
            onRefresh: async () => {},
            onEndReached: async () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            itemsOffset: 0,
            filters: this.props.filtersValue,
            items: this.props.items
        };
    }

    async componentDidMount() {
        await this.refresh();
    }

    async refresh() {
        if (!this.props.getItems) return;

        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        this.setState({ loading: true, itemsOffset: 0 }, async () => {
            const items = await this._getItems();
            this.setState({
                items: items,
                loading: false
            });
        });
    }

    _getItems = async (options = {}) => {
        const items = await this.props.getItems(
            {
                start: this.state.itemsOffset,
                limit: this.props.itemsRequestLimit,
                filter: this.state.searchText,
                sort: this.props.itemsSortField,
                ...options
            },
            { extraFilters: this._buildExtraFilters() }
        );
        return items;
    };

    _buildExtraFilters() {
        return Object.values(this.state.filters).filter(f => Boolean(f));
    }

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

    onFilter = async value => {
        await this.props.onFilter(value);
        this.setState({ filters: value }, async () => await this.refresh());
    };

    onRefresh = async () => {
        await this.props.onRefresh();
        await this.refresh();
    };

    onEndReached = async () => {
        await this.props.onEndReached();
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

    _style() {
        return [styles.listing, this.props.style];
    }

    _renderFilters() {
        if (this.props.filters.length === 0) return;

        return (
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContainer}
                horizontal={true}
                directionalLockEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {this._renderSelects()}
            </ScrollView>
        );
    }

    _renderSelects = () => {
        return this.props.filters.map(item => {
            return (
                <Select
                    style={styles.select}
                    placeholder={item.placeholder}
                    options={item.options}
                    value={this.state.filters[item.value]}
                    onUpdateValue={value => this.onSelectUpdateValue(item.value, value)}
                    width={item.width}
                    key={item.value}
                />
            );
        });
    };

    _renderEmptyList = () => {
        return (
            <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>{this.props.emptyItemsText}</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={this._style()}>
                <Search style={styles.search} onValue={this.onSearch} />
                {this._renderFilters()}
                <FlatList
                    ref={el => (this.flatListRef = el)}
                    key={"items"}
                    style={styles.flatList}
                    data={this.state.items}
                    refreshing={this.props.loading}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onEndReached}
                    renderItem={({ item, index }) => this.props.renderItem(item, index)}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={this._renderEmptyList()}
                    ListFooterComponent={<View style={styles.flatListBottom} />}
                    {...this.props.flatListProps}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listing: {
        flex: 1,
        backgroundColor: "#f6f7f9"
    },
    search: {
        marginBottom: 10,
        marginHorizontal: 15
    },
    scrollView: {
        marginHorizontal: 15
    },
    scrollViewContainer: {
        height: 46,
        marginBottom: 10
    },
    flatList: {
        paddingTop: 5,
        height: "100%"
    },
    select: {
        marginRight: 5
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
