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
            lazyRender: PropTypes.bool,
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
            lazilyRendered: false,
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
            momentumScrolling: false,
            selectedTab: this.props.selectedTab,
            selectedTabPosition: this.props.selectedTab * this.screenWidth,
            animatedBarOffset: undefined,
            animating: false,
            lazyRenderTabs: {}
        };

        this.scrollEventThrottleMomentum = 400;
        this.scrollEventThrottle = 70;
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

        const scroll = event.nativeEvent.contentOffset.x;
        const animateBarScrollRatio = scroll / this.screenWidth;
        const animateBarScrollRatioDecimal =
            animateBarScrollRatio < 1
                ? animateBarScrollRatio
                : animateBarScrollRatio - Math.trunc(animateBarScrollRatio);

        const scrollValue = this.screenWidth * this.state.selectedTab;

        // the value representing how much was scrolled into the other tab
        // if its scrolling back turns it in a negative value
        const animateBar =
            scroll < scrollValue
                ? -1 * (1 - animateBarScrollRatioDecimal)
                : animateBarScrollRatioDecimal;

        this.setState({ animatedBarOffset: animateBar });

        const selectedTab = Math.round(animateBarScrollRatio);
        const updated = selectedTab !== this.state.selectedTab;

        this.setState(
            {
                selectedTab: selectedTab
            },
            () => {
                if (updated) {
                    this.props.onTabChange(selectedTab);
                }
            }
        );
    };

    onMomentumScrollBegin = () => {
        this.setState({ momentumScrolling: true });
    };

    onMomentumScrollEnd = () => {
        this.setState({ animating: false, momentumScrolling: false });
    };

    onSelectedTabPress = () => {
        if (!this.props.tabs[this.state.selectedTab].scrollToTop) return;
        this.props.tabs[this.state.selectedTab].scrollToTop();
    };

    _shouldRender = tabIndex => {
        if (!this.props.lazyRender) return true;
        const shouldRender =
            this.state.selectedTab === tabIndex || this.state.lazyRenderTabs[tabIndex];

        // to avoid tabs being rendered more than once
        // the component keeps a state to log every tab rendered
        if (shouldRender) {
            const lazilyRendered = this.state.lazilyRendered;
            lazilyRendered[tabIndex] = shouldRender;
            this.setState({ lazyRenderTabs: lazilyRendered });
        }
        return shouldRender;
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
                        scrollEventThrottle={
                            this.state.momentumScrolling
                                ? this.scrollEventThrottleMomentum
                                : this.scrollEventThrottle
                        }
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        alwaysBounceHorizontal={false}
                        onScroll={this.onScroll}
                        onMomentumScrollBegin={this.onMomentumScrollBegin}
                        onMomentumScrollEnd={this.onMomentumScrollEnd}
                        ref={ref => {
                            this.scrollView = ref;
                        }}
                    >
                        {Object.values(this.props.tabs).map((tab, i) => (
                            <View key={i} style={this._tabStyle()}>
                                {this._shouldRender(i) ? tab.render() : null}
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
