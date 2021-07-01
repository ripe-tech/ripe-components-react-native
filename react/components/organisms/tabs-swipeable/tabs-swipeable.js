import React, { PureComponent } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    PanResponder,
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
                    emptyText: PropTypes.string.isRequired,
                    render: PropTypes.func.isRequired,
                    scrollToTop: PropTypes.func,
                    loadMore: PropTypes.func
                })
            ),
            currentTab: PropTypes.number,
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
            currentTab: 0,
            textVariant: undefined,
            swipeThreshold: 0.5,
            shouldPanThreshold: 5,
            onTabChange: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            nextTab: this.props.currentTab,
            currentTab: this.props.currentTab,
            swipingDirection: undefined,
            animationPositionX: new Animated.Value(0),
            nextAnimationPositionX: new Animated.Value(0)
        };

        this.screenWidth = Dimensions.get("screen").width;
        this.slowDownThreshold = this.screenWidth * this.props.swipeThreshold;
        this.animating = false;

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderTerminationRequest: () => false,
            onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease,
            onPanResponderTerminate: this.onPanResponderTerminate,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentTab !== this.props.currentTab) {
            this.setState({ nextTab: this.props.currentTab });
        }
    }

    isAfterThreshold(offset) {
        const distance = Math.abs(offset);
        return distance > 0 && distance > this.slowDownThreshold;
    }

    setSwipingDirection(offset) {
        // sets the swiping direction and the current tab
        // data as the next tab content that will be loaded
        // as the swiping animation progresses
        if (offset > 0 && this.state.currentTab > 0) {
            this.setState(prevState => ({
                swipingDirection: "left",
                nextTab: prevState.currentTab - 1
            }));
            this.state.nextAnimationPositionX.setValue(this.screenWidth);
            return "left";
        } else if (offset < 0 && this.state.currentTab < this.props.tabs.length - 1) {
            this.setState(prevState => ({
                swipingDirection: "right",
                nextTab: prevState.currentTab + 1
            }));
            this.state.nextAnimationPositionX.setValue(-1 * this.screenWidth);
            return "right";
        }

        this.state.nextAnimationPositionX.setValue(0);
        this.setState({ swipingDirection: undefined });
        return null;
    }

    onTabChange = tabIndex => {
        this.setState(
            {
                currentTab: tabIndex
            },
            () => this.props.onTabChange(tabIndex)
        );
    };

    onMoveShouldSetPanResponderCapture = (event, gestureState) => {
        // only moves if the distance moved is bigger than a threshold,
        // so that it does not block movement for scroll views inside
        // the tabs content
        return !this.animating && Math.abs(gestureState.dx) > this.props.shouldPanThreshold;
    };

    onPanResponderMove = (event, gestureState) => {
        if (this.animating) return;

        // gets the swiping direction result, to be used to
        // calculate the position of the next tab content
        const swipingDirection = this.setSwipingDirection(gestureState.dx);
        if (!swipingDirection) return;

        // calculates the position of the next tab content based
        // on the swiping direction
        let nextPositionXValue = 0;
        if (swipingDirection === "left") {
            nextPositionXValue = -1 * this.screenWidth + gestureState.dx;
        } else if (swipingDirection === "right") {
            nextPositionXValue = this.screenWidth + gestureState.dx;
        }

        this.state.animationPositionX.setValue(gestureState.dx);
        this.state.nextAnimationPositionX.setValue(nextPositionXValue);
    };

    onPanResponderRelease = (event, gestureState) => {
        this._releasePanel(gestureState);
    };

    onPanResponderTerminate = (event, gestureState) => {
        this._releasePanel(gestureState);
    };

    _releasePanel = gestureState => {
        this.animating = true;
        let afterThreshold = this.isAfterThreshold(gestureState.dx);
        let currentFinalValue = 0;
        let nextFinalValue = 0;

        // calculates the final position of the current and next tab
        // content when the user stops swiping, the content may default
        // to the starting position if the threshold was not surpassed
        if (this.state.swipingDirection === "left") {
            currentFinalValue = afterThreshold ? this.screenWidth : 0;
            nextFinalValue = afterThreshold ? 0 : -1 * this.screenWidth;
        } else if (this.state.swipingDirection === "right") {
            currentFinalValue = afterThreshold ? -1 * this.screenWidth : 0;
            nextFinalValue = afterThreshold ? 0 : this.screenWidth;
        }

        // starts the animations with the final position of the panels
        // and, if the threshold was surpassed, sets the previous tab
        // content with the one being shown now and, if the threshold
        // was not surpassed, the current tab state is reset to the
        // one before the start of the animation
        Animated.parallel([
            Animated.timing(this.state.animationPositionX, {
                toValue: currentFinalValue,
                useNativeDriver: false,
                easing: Easing.ease
            }),
            Animated.timing(this.state.nextAnimationPositionX, {
                toValue: nextFinalValue,
                useNativeDriver: false,
                easing: Easing.ease
            })
        ]).start(() => {
            this.animating = false;

            // if the threshold was surpassed, updates the current active
            // tab with the new one and if it was not surpassed, resets
            // the next tab state
            if (afterThreshold) {
                this.setState({
                    swipingDirection: undefined,
                    currentTab: this.state.nextTab
                });
                this.state.animationPositionX.setValue(0);
            } else {
                this.setState({
                    swipingDirection: undefined,
                    nextTab: this.state.currentTab
                });
            }
        });
    };

    _renderNext = () => {
        return this.props.tabs[this.state.nextTab].render();
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
                    variant={this.props.textVariant}
                    tabSelected={this.state.currentTab}
                    onTabChange={this.onTabChange}
                    onSelectedTabPress={this._scrollTop}
                    ref={this.tabsTextRef}
                />
                <View style={this._style()} {...this.panResponder.panHandlers}>
                    <Animated.View style={this._nextContentStyle()}>
                        {this.state.swipingDirection ? this._renderNext() : null}
                    </Animated.View>
                    <Animated.View style={this._currentContentStyle()}>
                        {this.props.tabs[this.state.currentTab].render()}
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

export default TabsSwipeable;
