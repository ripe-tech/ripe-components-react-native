import React, { PureComponent } from "react";
import {
    StyleSheet,
    ViewPropTypes,
    Animated,
    PanResponder,
    Dimensions,
    View,
    Easing
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import PropTypes from "prop-types";

import { Icon, Text } from "../../";
import { baseStyles } from "../../../util";

const { width } = Dimensions.get("screen");

export class ContainerSwipeableHorizontal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeOption: null,
            animationPositionX: new Animated.Value(0)
        };

        this._isAnimating = false;
        this._initialViewPositionX = 0;
        this._previousGestureXValue = 0;

        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease
        });
    }

    static get propTypes() {
        return {
            triggerActionThreshold: PropTypes.number,
            style: ViewPropTypes.style,
            swipeLeft: PropTypes.bool,
            swipeRight: PropTypes.bool,
            swipeLeftIcon: PropTypes.string,
            swipeRightIcon: PropTypes.string,
            swipeLeftIconColor: PropTypes.string,
            swipeRightIconColor: PropTypes.string,
            swipeLeftText: PropTypes.string,
            swipeRightText: PropTypes.string,
            swipeLeftGradientColors: PropTypes.array,
            swipeRightGradientColors: PropTypes.array,
            onSwipeLeft: PropTypes.func,
            onSwipeRight: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            triggerActionThreshold: 0.3,
            style: {},
            swipeLeft: false,
            swipeRight: false,
            swipeLeftIcon: undefined,
            swipeRightIcon: undefined,
            swipeLeftIconColor: undefined,
            swipeRightIconColor: undefined,
            swipeLeftText: undefined,
            swipeRightText: undefined,
            swipeLeftGradientColors: undefined,
            swipeRightGradientColors: undefined,
            onSwipeLeft: () => null,
            onSwipeRight: () => null
        };
        // return {
        //     triggerActionThreshold:,
        //     style: {},

        //     onLeftOptionTrigger:
        //     leftOptionGradientColors:
        //     leftOptionText:
        //     leftOptionTextColor:
        //     leftOptionTextStyle:
        //     leftOptionIcon:
        //     leftOptionIconColor:
        //     leftOptionIconWidth:
        //     leftOptionIconHeight:
        //     leftOptionIconStyle:
        // }
    }

    onMoveShouldSetPanResponderCapture = (_ev, _gestureState) => {
        return !this._isAnimating;
    };

    onPanResponderGrant = (_ev, _gestureState) => {
        this._initialViewPositionX = this.state.animationPositionX.__getValue();
    };

    onPanResponderMove = (_evt, gestureState) => {
        if (!this._isAllowedToSwipe(gestureState)) {
            if (this._previousGestureXValue !== 0) {
                this.state.animationPositionX.setValue(0);
            }
            return;
        }

        let gestureStateDistanceX = 0;
        const hasReachedSlowDownThreshold = this._hasReachedSlowDownThreshold(gestureState);

        // if (hasReachedSlowDownThreshold) {
        //     const diff = (gestureState.dx - this._previousGestureXValue) / 4;
        //     gestureStateDistanceX = this._previousGestureXValue + diff;
        // } else {
        this._previousGestureXValue = gestureState.dx;
        gestureStateDistanceX = gestureState.dx;
        // }

        const nextViewPositionX = this._initialViewPositionX + gestureStateDistanceX;

        this.state.animationPositionX.setValue(nextViewPositionX);
    };

    onPanResponderRelease = (_evt, gestureState) => {
        this._isAnimating = true;
        this._previousGestureXValue = 0;
        this._triggerFunctionOnThreshold(gestureState);

        //@TODO chekc if margin affects the 0 to value
        Animated.timing(this.state.animationPositionX, {
            // toValue: this._initialViewPositionX,
            toValue: 0,
            easing: Easing.ease
        }).start(() => {
            this._isAnimating = false;
        });
    };

    _triggerFunctionOnThreshold(gestureState) {
        if (Math.abs(gestureState.dx) > this._getSlowDownThreshold()) {
            const gestureStateDX = Math.sign(gestureState.dx);
            if (gestureStateDX === 1 && this.props.swipeRight) {
                this.props.onSwipeRight();
            } else if (gestureStateDX === -1 && this.props.swipeLeft) {
                this.props.onSwipeLeft();
            }
        }
    }

    _isAllowedToSwipe(gestureState) {
        if (this._isAnimating) {
            return false;
        } else if (gestureState.dx === 0) {
            return true;
        } else if (gestureState.dx > 0 && this.props.swipeRight) {
            this.setState({ activeOption: "leftOption" });
            return true;
        } else if (gestureState.dx < 0 && this.props.swipeLeft) {
            this.setState({ activeOption: "rightOption" });
            return true;
        }

        this.setState({ activeOption: null });
        return false;
    }

    _getSlowDownThreshold() {
        return width * this.props.triggerActionThreshold;
    }

    _hasReachedSlowDownThreshold(gestureState) {
        const slowDownThreshold = this._getSlowDownThreshold();
        const gestureStateX = Math.abs(gestureState.dx);
        return gestureStateX > 0 && gestureStateX > slowDownThreshold;
    }

    _style = () => {
        return [styles.containerSwipeableHorizontal, this.props.style];
    };

    _contentStyle = () => {
        return [
            styles.containerChildren,
            { transform: [{ translateX: this.state.animationPositionX }] }
        ];
    };

    // @TODO FIX THIS create  only one item render that we pass all the info that we need
    _renderLeftOption = () => {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={this.props.swipeRightGradientColors}
                style={styles.containerOption}
            >
                {this.props.swipeRightIcon ? (
                    <Icon
                        icon={this.props.swipeRightIcon}
                        color={this.props.swipeRightIconColor}
                        height={32}
                        width={32}
                    />
                ) : null}

                {this.props.swipeRightText ? (
                    <Text style={styles.textOption}>{this.props.swipeRightText}</Text>
                ) : null}
            </LinearGradient>
        );
    };

    _renderRightOption = () => {
        return (
            <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={this.props.swipeLeftGradientColors}
                style={styles.containerGradient}
            >
                <View style={styles.containerOption}>
                    {this.props.swipeLeftIcon ? (
                        <Icon
                            icon={this.props.swipeLeftIcon}
                            color={this.props.swipeLeftIconColor}
                            height={32}
                            width={32}
                        />
                    ) : null}

                    {this.props.swipeLeftText ? (
                        <Text style={styles.textOption}>{this.props.swipeLeftText}</Text>
                    ) : null}
                </View>
            </LinearGradient>
        );
    };

    _renderOptions = () => {
        const toRender = [];

        switch (this.state.activeOption) {
            case "rightOption":
                toRender.push(this._renderLeftOption());
                break;
            case "leftOption":
                toRender.push(this._renderRightOption());
                break;

            default:
                if (this.props.swipeLeft) {
                    toRender.push(this._renderRightOption());
                }
                if (this.props.swipeRight) {
                    toRender.push(this._renderLeftOption());
                }

                break;
        }

        return toRender;
    };

    render() {
        return (
            <View style={this._style()} {...this._panResponder.panHandlers}>
                <View style={styles.containerOptions}>{this._renderOptions()}</View>
                <Animated.View style={this._contentStyle()}>{this.props.children}</Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerSwipeableHorizontal: {},
    containerOptions: {
        flexDirection: "row",
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    containerGradient: {
        flex: 1,
        flexDirection: "row"
    },
    containerOption: {
        margin: 14,
        justifyContent: "space-around",
        alignItems: "center"
    },
    textOption: {
        fontFamily: baseStyles.FONT,
        fontSize: 14,
        letterSpacing: 0.5,
        color: "#ffffff"
    },
    containerChildren: {
        backgroundColor: "white"
    }
});
