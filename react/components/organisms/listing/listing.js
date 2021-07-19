import React, { Component } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { Search, Select } from "../../molecules";

export class Listing extends Component {
    static get propTypes() {
        return {
            items: PropTypes.array.isRequired,
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
            items: [],
            renderItem: () => {},
            filters: [],
            filtersValue: {},
            emptyItemsText: "No items",
            flatListProps: {},
            onSearch: () => {},
            onFilter: () => {},
            onEndReached: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            filters: this.props.filtersValue,
            items: this.props.items
        };
    }

    onSelectUpdateValue = (key, value) => {
        this.setState(
            ({ filters }) => ({ filters: { ...filters, [key]: value } }),
            this.props.onFilter(this.state.filters)
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
                <Search style={styles.search} onValue={this.props.onSearch} />
                {this._renderFilters()}
                <FlatList
                    key={"accounts"}
                    style={styles.flatList}
                    data={this.props.items}
                    refreshing={this.props.loading}
                    onRefresh={this.props.onRefresh}
                    onEndReached={this.props.onEndReached}
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
