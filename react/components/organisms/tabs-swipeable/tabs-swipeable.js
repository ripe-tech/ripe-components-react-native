import React, { PureComponent } from "react";
import { Dimensions, ScrollView, StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { TabsText } from "../../molecules";

export class TabsSwipeable extends PureComponent {
    static get propTypes() {
        return {
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    emptyText: PropTypes.string.isRequired,
                    render: PropTypes.func.isRequired,
                    scrollToTop: PropTypes.func,
                    loadMore: PropTypes.func
                })
            ),
            selectedTab: PropTypes.number,
            textVariant: PropTypes.string,
            swipeThreshold: PropTypes.number,
            shouldPanThreshold: PropTypes.number,
            onTabChange: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            tabs: [],
            selectedTab: 0,
            textVariant: undefined,
            onTabChange: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.screenWidth = Dimensions.get("screen").width;

        this.state = {
            selectedTabPosition: this.props.selectedTab * this.screenWidth,
            selectedTab: this.props.selectedTab
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedTab !== this.props.selectedTab) {
            this.setState({ selectedTab: this.props.selectedTab });
        }
    }

    onTabChange = tabIndex => {
        this.setState(
            {
                selectedTab: tabIndex
            },
            () => this.props.onTabChange(tabIndex)
        );
    };

    onScroll = event => {
        const scroll = event.nativeEvent.contentOffset.x;

        const selectedTab = Math.round(scroll / this.screenWidth);
        this.setState({ selectedTab: selectedTab });
    };

    onSelectedTabPress = () => {
        this.props.tabs[this.state.selectedTab].scrollToTop();
    };

    _style() {
        return [styles.tabs, this.props.style];
    }

    _tabStyle = () => {
        return [styles.tabContent, { width: this.screenWidth }];
    };

    render() {
        return (
            <View style={this._style()}>
                <TabsText
                    tabs={this.props.tabs}
                    variant={this.props.textVariant}
                    tabSelected={this.state.selectedTab}
                    onTabChange={this.onTabChange}
                    onSelectedTabPress={this.onSelectedTabPress}
                />
                <ScrollView
                    contentOffset={{ x: this.state.selectedTabPosition, y: 0 }}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this.onScroll}
                >
                    {Object.values(this.props.tabs).map(val => (
                        <View style={this._tabStyle()}>{val.render()}</View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flex: 1
    },
    tabContent: {
        height: "100%",
        flex: 1
    }
});

export default TabsSwipeable;
