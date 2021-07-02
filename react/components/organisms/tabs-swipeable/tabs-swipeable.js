import React, { PureComponent } from "react";
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    StyleSheet,
    View,
    ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

import { TabsText } from "../../molecules";

export class TabsSwipeable extends PureComponent {
    static get propTypes() {
        return {
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    emptyText: PropTypes.string,
                    render: PropTypes.func.isRequired,
                    scrollToTop: PropTypes.func,
                    loadMore: PropTypes.func
                })
            ),
            selectedTab: PropTypes.number,
            textVariant: PropTypes.string,
            loading: PropTypes.bool,
            onTabChange: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            tabs: [],
            selectedTab: 0,
            textVariant: undefined,
            loading: false,
            onTabChange: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.screenWidth = Dimensions.get("screen").width;

        this.state = {
            selectedTab: this.props.selectedTab,
            selectedTabPosition: this.props.selectedTab * this.screenWidth
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
                selectedTab: tabIndex,
                selectedTabPosition: tabIndex * this.screenWidth
            },
            () => {
                this.props.onTabChange(tabIndex);
            }
        );
    };

    onScroll = event => {
        const scroll = event.nativeEvent.contentOffset.x;

        const selectedTab = Math.round(scroll / this.screenWidth);
        const updated = selectedTab !== this.state.selectedTab;

        this.setState(
            {
                selectedTab: selectedTab,
                selectedTabPosition: selectedTab * this.screenWidth
            },
            () => {
                if (updated) this.props.onTabChange(selectedTab);
            }
        );
    };

    onSelectedTabPress = () => {
        if (!this.props.tabs[this.state.selectedTab].scrollToTop) return;
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
                {this.props.loading ? (
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size="large"
                        color="#6687f6"
                    />
                ) : (
                    <ScrollView
                        contentOffset={{ x: this.state.selectedTabPosition, y: 0 }}
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onScroll={this.onScroll}
                        ref={ref => {
                            this.scrollView = ref;
                        }}
                    >
                        {Object.values(this.props.tabs).map((tab, i) => (
                            <View key={i} style={this._tabStyle()}>
                                {tab.render()}
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flex: 1
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: "25%"
    },
    tabContent: {
        height: "100%",
        flex: 1
    }
});

export default TabsSwipeable;
