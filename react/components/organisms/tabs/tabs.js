import React, { PureComponent } from "react";
import { Animated, Dimensions, PanResponder, StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { TabsText } from "../../molecules";

export class Tabs extends PureComponent {
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
            currentTab: PropTypes.number,
            swipeThreshold: PropTypes.number,
            onTabChange: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            tabs: [],
            currentTab: 0,
            swipeThreshold: 0.5,
            onTabChange: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTabData: this.props.currentTab,
            previousTab: this.props.currentTab,
            swipingDirection: undefined,
            animationPositionX: new Animated.Value(0),
            nextAnimationPositionX: new Animated.Value(0)
        };

        this.screenWidth = Dimensions.get("screen").width;
        this.slowDownThreshold = this.screenWidth * this.props.swipeThreshold;
        this.animating = false;

        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentTab !== this.props.currentTab) {
            this.setState({ currentTabData: this.props.currentTab });
        }
    }

    isAfterThreshold(offset) {
        const distance = Math.abs(offset);
        return distance > 0 && distance > this.slowDownThreshold;
    }

    setSwipingDirection(offset) {
        if (offset > 0 && this.state.previousTab > 0) {
            this.setState(prevState => ({
                swipingDirection: "left",
                currentTabData: prevState.previousTab - 1
            }));
            this.state.nextAnimationPositionX.setValue(this.screenWidth);
            return true;
        } else if (offset < 0 && this.state.previousTab < this.props.tabs.length - 1) {
            this.setState(prevState => ({
                swipingDirection: "right",
                currentTabData: prevState.previousTab + 1
            }));
            this.state.nextAnimationPositionX.setValue(-1 * this.screenWidth);
            return true;
        }

        this.setState({ swipingDirection: undefined });
        return false;
    }

    onTabChange = tabIndex => {
        this.setState(
            {
                previousTab: tabIndex
            },
            () => this.props.onTabChange(tabIndex)
        );
    };

    onMoveShouldSetPanResponderCapture = (event, gestureState) => {
        return !this.animating;
    };

    onPanResponderMove = (event, gestureState) => {
        if (this.animating) return;

        if (!this.setSwipingDirection(gestureState.dx)) {
            this.state.animationPositionX.setValue(0);
            return;
        }

        let nextPositionXValue = 0;
        if (this.state.swipingDirection === "left") {
            nextPositionXValue = -1 * this.screenWidth + gestureState.dx;
        } else if (this.state.swipingDirection === "right") {
            nextPositionXValue = this.screenWidth + gestureState.dx;
        }

        this.state.animationPositionX.setValue(gestureState.dx);
        this.state.nextAnimationPositionX.setValue(nextPositionXValue);
    };

    onPanResponderRelease = (event, gestureState) => {
        this.animating = true;
        let finalValue = 0;
        let afterThreshold = this.isAfterThreshold(gestureState.dx);

        if (afterThreshold && this.state.swipingDirection === "left") {
            finalValue = this.screenWidth;
        } else if (afterThreshold && this.state.swipingDirection === "right") {
            finalValue = -1 * this.screenWidth;
        }

        Animated.parallel([
            Animated.timing(this.state.animationPositionX, {
                toValue: finalValue,
                useNativeDriver: false
            }),
            Animated.timing(this.state.nextAnimationPositionX, {
                toValue: 0,
                useNativeDriver: false
            })
        ]).start(() => {
            this.animating = false;
            if (!afterThreshold) return;
            this.setState(
                {
                    previousTab: this.state.currentTabData
                },
                () => {
                    this.state.nextAnimationPositionX.setValue(0);
                    this.state.animationPositionX.setValue(0);
                }
            );
        });
    };

    _renderNext = () => {
        return this.props.tabs[this.state.currentTabData].render();
    };

    _style() {
        return [styles.tabs, this.props.style];
    }

    _currentContentStyle = () => {
        return [styles.tabContent, { transform: [{ translateX: this.state.animationPositionX }] }];
    };

    _nextContentStyle = () => {
        return [
            styles.nextTabContent,
            {
                transform: [
                    {
                        translateX: this.state.nextAnimationPositionX
                    }
                ]
            }
        ];
    };

    render() {
        return (
            <View style={this._style()}>
                <TabsText
                    tabs={this.props.tabs}
                    tabSelected={this.state.previousTab}
                    onTabChange={this.onTabChange}
                    onSelectedTabPress={this._scrollTop}
                />
                <View style={this._style()} {...this.panResponder.panHandlers}>
                    <Animated.View style={this._nextContentStyle()}>
                        {this.state.swipingDirection ? this._renderNext() : null}
                    </Animated.View>
                    <Animated.View style={this._currentContentStyle()}>
                        {this.props.tabs[this.state.previousTab].render()}
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flex: 1
    },
    nextTabContent: {
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    tabContent: {
        position: "absolute",
        width: "100%",
        height: "100%"
    }
});

export default Tabs;
