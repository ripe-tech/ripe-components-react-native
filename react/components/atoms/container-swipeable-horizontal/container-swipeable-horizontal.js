import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Animated, PanResponder, Dimensions, View } from "react-native";
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
        this._latestFullVelocityGestureXValue = 0;

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
            optionContainerStyle: ViewPropTypes.style,
            leftOptionEnabled: PropTypes.bool,
            rightOptionEnabled: PropTypes.bool,
            onLeftOptionTrigger: PropTypes.func,
            onRightOptionTrigger: PropTypes.func,
            leftOptionGradientColors: PropTypes.array,
            rightOptionGradientColors: PropTypes.array,
            leftOptionText: PropTypes.string,
            rightOptionText: PropTypes.string,
            leftOptionTextColor: PropTypes.string,
            rightOptionTextColor: PropTypes.string,
            leftOptionTextStyle: ViewPropTypes.style,
            rightOptionTextStyle: ViewPropTypes.style,
            leftOptionIcon: PropTypes.string,
            rightOptionIcon: PropTypes.string,
            leftOptionIconColor: PropTypes.string,
            rightOptionIconColor: PropTypes.string,
            leftOptionIconHeight: PropTypes.number,
            rightOptionIconHeight: PropTypes.number,
            leftOptionIconWidth: PropTypes.number,
            rightOptionIconWidth: PropTypes.number,
            leftOptionIconStrokeWidth: PropTypes.number,
            rightOptionIconStrokeWidth: PropTypes.number,
            leftOptionIconStyle: ViewPropTypes.style,
            rightOptionIconStyle: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            triggerActionThreshold: 0.3,
            style: {},
            optionContainerStyle: {},
            leftOptionEnabled: false,
            rightOptionEnabled: false,
            onLeftOptionTrigger: () => null,
            onRightOptionTrigger: () => null,
            leftOptionGradientColors: [],
            rightOptionGradientColors: [],
            leftOptionText: undefined,
            rightOptionText: undefined,
            leftOptionTextColor: "#ffffff",
            rightOptionTextColor: "#ffffff",
            leftOptionTextStyle: {},
            rightOptionTextStyle: {},
            leftOptionIcon: undefined,
            rightOptionIcon: undefined,
            leftOptionIconColor: "#ffffff",
            rightOptionIconColor: "#ffffff",
            leftOptionIconHeight: 32,
            rightOptionIconHeight: 32,
            leftOptionIconWidth: 32,
            rightOptionIconWidth: 32,
            leftOptionIconStrokeWidth: 1,
            rightOptionIconStrokeWidth: 1,
            leftOptionIconStyle: undefined,
            rightOptionIconStyle: undefined
        };
    }

    onMoveShouldSetPanResponderCapture = (_ev, _gestureState) => {
        if (!this.props.leftOptionEnabled && !this.props.rightOptionEnabled) {
            return false;
        }
        return !this._isAnimating;
    };

    onPanResponderGrant = (_ev, _gestureState) => {
        this._initialViewPositionX = this.state.animationPositionX.__getValue();
    };

    onPanResponderMove = (_evt, gestureState) => {
        if (!this._isAllowedToSwipe(gestureState)) {
            const finalValuePositionNotFinished = this._latestFullVelocityGestureXValue !== 0;
            if (finalValuePositionNotFinished) {
                this.state.animationPositionX.setValue(0);
            }
            return;
        }

        let gestureStateDistanceX = 0;
        const hasReachedSlowDownThreshold = this._hasReachedSlowDownThreshold(gestureState);

        if (hasReachedSlowDownThreshold) {
            const diff = (gestureState.dx - this._latestFullVelocityGestureXValue) / 4;
            gestureStateDistanceX = this._latestFullVelocityGestureXValue + diff;
        } else {
            this._latestFullVelocityGestureXValue = gestureState.dx;
            gestureStateDistanceX = gestureState.dx;
        }

        const nextViewPositionX = this._initialViewPositionX + gestureStateDistanceX;
        this.state.animationPositionX.setValue(nextViewPositionX);
    };

    onPanResponderRelease = (_evt, gestureState) => {
        this._isAnimating = true;
        this._latestFullVelocityGestureXValue = 0;
        this._triggerOptionsOnThreshold(gestureState);

        Animated.timing(this.state.animationPositionX, {
            toValue: 0
        }).start(() => {
            this._isAnimating = false;
        });
    };

    _triggerOptionsOnThreshold(gestureState) {
        const hasGestureReachedThreshold = Math.abs(gestureState.dx) > this._getValueThreshold();
        const gestureStateDX = Math.sign(gestureState.dx);

        if (hasGestureReachedThreshold) {
            if (gestureStateDX === 1 && this.props.leftOptionEnabled) {
                this.props.onLeftOptionTrigger();
            } else if (gestureStateDX === -1 && this.props.rightOptionEnabled) {
                this.props.onRightOptionTrigger();
            }
        }
    }

    _isAllowedToSwipe(gestureState) {
        const isSwipingLeftToRight = gestureState.dx > 0;
        const isSwipingRightToLeft = gestureState.dx < 0;

        if (this._isAnimating) {
            return false;
        } else if (isSwipingLeftToRight && this.props.leftOptionEnabled) {
            this.setState({ activeOption: "leftOption" });
            return true;
        } else if (isSwipingRightToLeft && this.props.rightOptionEnabled) {
            this.setState({ activeOption: "rightOption" });
            return true;
        }

        this.setState({ activeOption: null });
        return false;
    }

    _getValueThreshold() {
        return width * this.props.triggerActionThreshold;
    }

    _hasReachedSlowDownThreshold(gestureState) {
        const slowDownThreshold = this._getValueThreshold();
        const absGestureStateX = Math.abs(gestureState.dx);
        return absGestureStateX > 0 && absGestureStateX > slowDownThreshold;
    }

    _renderLeftOption = () => {
        return (
            <LinearGradient
                key="leftOption"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={this.props.leftOptionGradientColors}
                style={styles.containerGradient}
            >
                <View style={this._containerOptionStyles()}>
                    {this.props.leftOptionIcon ? (
                        <Icon
                            icon={this.props.leftOptionIcon}
                            color={this.props.leftOptionIconColor}
                            height={this.props.leftOptionIconHeight}
                            width={this.props.leftOptionIconWidth}
                            strokeWidth={this.props.leftOptionIconStrokeWidth}
                            style={this.props.leftOptionIconStyle}
                        />
                    ) : null}
                    {this.props.leftOptionText ? (
                        <Text style={this._leftOptionTextStyles()}>
                            {this.props.leftOptionText}
                        </Text>
                    ) : null}
                </View>
            </LinearGradient>
        );
    };

    _renderRightOption = () => {
        return (
            <LinearGradient
                key="rightOption"
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={this.props.rightOptionGradientColors}
                style={[styles.containerGradient, styles.containerGradientOptionRight]}
            >
                <View style={this._containerOptionStyles()}>
                    {this.props.rightOptionIcon ? (
                        <Icon
                            icon={this.props.rightOptionIcon}
                            color={this.props.rightOptionIconColor}
                            height={this.props.rightOptionIconHeight}
                            width={this.props.rightOptionIconWidth}
                            strokeWidth={this.props.rightOptionIconStrokeWidth}
                            style={this.props.rightOptionIconStyle}
                        />
                    ) : null}
                    {this.props.rightOptionText ? (
                        <Text style={this._rightOptionTextStyles()}>
                            {this.props.rightOptionText}
                        </Text>
                    ) : null}
                </View>
            </LinearGradient>
        );
    };

    _renderOptions = () => {
        const toRender = [];

        switch (this.state.activeOption) {
            case "rightOption":
                toRender.push(this._renderRightOption());
                break;
            case "leftOption":
                toRender.push(this._renderLeftOption());
                break;

            default:
                if (this.props.rightOptionEnabled) {
                    toRender.push(this._renderRightOption());
                }
                if (this.props.leftOptionEnabled) {
                    toRender.push(this._renderLeftOption());
                }
                break;
        }

        return toRender;
    };

    _style = () => {
        return [styles.containerSwipeableHorizontal, this.props.style];
    };

    _contentStyle = () => {
        return [{ transform: [{ translateX: this.state.animationPositionX }] }];
    };

    _containerOptionStyles() {
        return [styles.containerOption, this.props.optionContainerStyle];
    }

    _leftOptionTextStyles() {
        return [
            styles.textOption,
            { color: this.props.leftOptionTextColor },
            this.props.leftOptionTextStyle
        ];
    }

    _rightOptionTextStyles() {
        return [
            styles.textOption,
            { color: this.props.rightOptionTextColor },
            this.props.rightOptionTextStyle
        ];
    }

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
        position: "absolute",
        height: "100%",
        width: "100%"
    },
    containerGradient: {
        flex: 1,
        flexDirection: "row"
    },
    containerGradientOptionRight: {
        justifyContent: "flex-end"
    },
    containerOption: {
        marginHorizontal: 14,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    textOption: {
        fontFamily: baseStyles.FONT,
        fontSize: 14,
        letterSpacing: 0.5
    }
});
