import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Animated, PanResponder, Dimensions, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import PropTypes from "prop-types";

import { Icon, Text } from "../../";
import { baseStyles } from "../../../util";

export class ContainerSwipeableHorizontal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            swipingDirection: undefined,
            animationPositionX: new Animated.Value(0)
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

    static get propTypes() {
        return {
            swipeThreshold: PropTypes.number,
            afterThresholdSlowdown: PropTypes.number,
            swipeLeftEnabled: PropTypes.bool,
            leftOptionGradientColors: PropTypes.array,
            leftOptionText: PropTypes.string,
            leftOptionTextColor: PropTypes.string,
            leftOptionTextStyle: ViewPropTypes.style,
            leftOptionIcon: PropTypes.string,
            leftOptionIconColor: PropTypes.string,
            leftOptionIconHeight: PropTypes.number,
            leftOptionIconWidth: PropTypes.number,
            leftOptionIconStrokeWidth: PropTypes.number,
            leftOptionIconStyle: ViewPropTypes.style,
            onLeftOptionTrigger: PropTypes.func,
            swipeRightEnabled: PropTypes.bool,
            rightOptionGradientColors: PropTypes.array,
            rightOptionText: PropTypes.string,
            rightOptionTextColor: PropTypes.string,
            rightOptionIconHeight: PropTypes.number,
            rightOptionTextStyle: ViewPropTypes.style,
            rightOptionIcon: PropTypes.string,
            rightOptionIconColor: PropTypes.string,
            rightOptionIconWidth: PropTypes.number,
            rightOptionIconStrokeWidth: PropTypes.number,
            rightOptionIconStyle: ViewPropTypes.style,
            onRightOptionTrigger: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            swipeThreshold: 0.25,
            afterThresholdSlowdown: 8,
            swipeLeftEnabled: false,
            leftOptionGradientColors: [],
            leftOptionText: undefined,
            leftOptionTextColor: "#ffffff",
            leftOptionTextStyle: {},
            leftOptionIcon: undefined,
            leftOptionIconColor: "#ffffff",
            leftOptionIconHeight: 32,
            leftOptionIconWidth: 32,
            leftOptionIconStrokeWidth: 1,
            leftOptionIconStyle: undefined,
            onLeftOptionTrigger: () => null,
            swipeRightEnabled: false,
            rightOptionGradientColors: [],
            rightOptionText: undefined,
            rightOptionTextColor: "#ffffff",
            rightOptionTextStyle: {},
            rightOptionIcon: undefined,
            rightOptionIconColor: "#ffffff",
            rightOptionIconHeight: 32,
            rightOptionIconWidth: 32,
            rightOptionIconStrokeWidth: 1,
            rightOptionIconStyle: undefined,
            onRightOptionTrigger: () => null,
            style: {}
        };
    }

    isAfterThreshold(offset) {
        const distance = Math.abs(offset);
        return distance > 0 && distance > this.slowDownThreshold;
    }

    setSwipingDirection(offset) {
        if (offset > 0 && this.props.swipeLeftEnabled) {
            this.setState({ swipingDirection: "left" });
            return true;
        } else if (offset < 0 && this.props.swipeRightEnabled) {
            this.setState({ swipingDirection: "right" });
            return true;
        }

        this.setState({ swipingDirection: undefined });
        return false;
    }

    onMoveShouldSetPanResponderCapture = (event, gestureState) => {
        if (!this.props.swipeLeftEnabled && !this.props.swipeRightEnabled) {
            return false;
        }
        return !this.animating;
    };

    onPanResponderMove = (event, gestureState) => {
        if (this.animating) return;

        if (!this.setSwipingDirection(gestureState.dx)) {
            this.state.animationPositionX.setValue(0);
            return;
        }

        if (this.isAfterThreshold(gestureState.dx)) {
            const sign = this.state.swipingDirection === "left" ? 1 : -1;
            const base = sign * this.slowDownThreshold;
            const offset = base + (gestureState.dx - base) / this.props.afterThresholdSlowdown;

            this.state.animationPositionX.setValue(offset);
        } else {
            this.state.animationPositionX.setValue(gestureState.dx);
        }
    };

    onPanResponderRelease = (eventt, gestureState) => {
        this.animating = true;

        if (this.isAfterThreshold(gestureState.dx)) {
            if (this.state.swipingDirection === "left") {
                this.props.onLeftOptionTrigger();
            } else {
                this.props.onRightOptionTrigger();
            }
        }

        Animated.timing(this.state.animationPositionX, {
            toValue: 0
        }).start(() => {
            this.animating = false;
        });
    };

    _leftOptionTextStyle() {
        return [
            styles.textOption,
            { color: this.props.leftOptionTextColor },
            this.props.leftOptionTextStyle
        ];
    }

    _rightOptionTextStyle() {
        return [
            styles.textOption,
            { color: this.props.rightOptionTextColor },
            this.props.rightOptionTextStyle
        ];
    }

    _rightOptionsGradientStyle() {
        return [styles.containerGradient, styles.containerGradientOptionRight];
    }

    _contentStyle = () => {
        return [{ transform: [{ translateX: this.state.animationPositionX }] }];
    };

    _style = () => {
        return [styles.containerSwipeableHorizontal, this.props.style];
    };

    _renderLeftOption = () => {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={this.props.leftOptionGradientColors}
                style={styles.containerGradient}
            >
                <View style={styles.containerOption}>
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
                        <Text style={this._leftOptionTextStyle()}>{this.props.leftOptionText}</Text>
                    ) : null}
                </View>
            </LinearGradient>
        );
    };

    _renderRightOption = () => {
        return (
            <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={this.props.rightOptionGradientColors}
                style={this._rightOptionsGradientStyle()}
            >
                <View style={styles.containerOption}>
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
                        <Text style={this._rightOptionTextStyle()}>
                            {this.props.rightOptionText}
                        </Text>
                    ) : null}
                </View>
            </LinearGradient>
        );
    };

    render() {
        return (
            <View style={this._style()} {...this.panResponder.panHandlers}>
                <View style={styles.containerOptions}>
                    {this.props.swipeLeftEnabled && this.state.swipingDirection === "left"
                        ? this._renderLeftOption()
                        : null}
                    {this.props.swipeRightEnabled && this.state.swipingDirection === "right"
                        ? this._renderRightOption()
                        : null}
                </View>
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
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    textOption: {
        fontFamily: baseStyles.FONT,
        fontSize: baseStyles.FONT_SIZE,
        letterSpacing: 0.5
    }
});
