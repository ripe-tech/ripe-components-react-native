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
            barAnimatedCoeficient: PropTypes.number,
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
            barAnimatedCoeficient: undefined,
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
            selectedTabPosition: this.props.selectedTab * this.screenWidth,
            animatedBarOffset: undefined,
            animating: false
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
                animating: true,
                selectedTab: tabIndex
            },
            () => {
                this.scrollView.scrollTo({ x: tabIndex * this.screenWidth });
                this.props.onTabChange(tabIndex);
            }
        );
    };

    onScroll = event => {
        if (this.state.animating) return;
        const scroll =
            this.state.selectedTab === 0
                ? event.nativeEvent.contentOffset.x
                : event.nativeEvent.contentOffset.x - this.screenWidth * this.state.selectedTab;
        console.log("scroll", scroll / this.screenWidth);
        this.setState({ animatedBarOffset: scroll / this.screenWidth });
        // problema aqui
        const selectedTab = Math.round(Math.abs(scroll) / this.screenWidth);
        console.log("selectedTab", selectedTab);
        const updated = selectedTab !== this.state.selectedTab;

        this.setState(
            {
                selectedTab: selectedTab
            },
            () => {
                console.log(`mudou tab ${updated} \n\n`);
                if (updated) this.props.onTabChange(selectedTab);
            }
        );
    };

    onMomentumScrollEnd = () => {
        console.log("momentum scroll end\n\n");
        console.log("\n\n");
        this.setState({ animating: false });
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
                    barAnimatedCoeficient={this.state.animatedBarOffset}
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
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        alwaysBounceHorizontal={false}
                        onScroll={this.onScroll}
                        scrollEventThrottle={22}
                        onMomentumScrollEnd={this.onMomentumScrollEnd}
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
        flex: 1,
        height: "100%"
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
