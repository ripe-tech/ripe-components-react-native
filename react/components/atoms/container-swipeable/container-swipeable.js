import React, { PureComponent } from "react";
import { Animated, Dimensions, PanResponder, StyleSheet, View, ViewPropTypes } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

export class ContainerSwipeable extends PureComponent {
    static get propTypes() {
        return {
            swipeThreshold: PropTypes.number,
            afterThresholdSlowdown: PropTypes.number,
            swipeLeftEnabled: PropTypes.bool,
            leftOptionComponent: PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.node),
                PropTypes.node
            ]),
            leftOptionGradientAngle: PropTypes.number,
            leftOptionGradientColors: PropTypes.array,
            leftOptionGradientLocations: PropTypes.arrayOf(PropTypes.number),
            swipeRightEnabled: PropTypes.bool,
            rightOptionComponent: PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.node),
                PropTypes.node
            ]),
            rightOptionGradientAngle: PropTypes.number,
            rightOptionGradientColors: PropTypes.array,
            rightOptionGradientLocations: PropTypes.arrayOf(PropTypes.number),
            onLeftOptionTrigger: PropTypes.func,
            onRightOptionTrigger: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            swipeThreshold: 0.25,
            afterThresholdSlowdown: 8,
            swipeLeftEnabled: false,
            leftOptionGradientAngle: 62,
            leftOptionGradientColors: [],
            leftOptionGradientLocations: [0.1, 0.64],
            swipeRightEnabled: false,
            rightOptionGradientAngle: 62,
            rightOptionGradientColors: [],
            rightOptionGradientLocations: [0.84, 0.4],
            onLeftOptionTrigger: () => null,
            onRightOptionTrigger: () => null,
            style: {},
            styles: styles
        };
    }

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

    onPanResponderRelease = (event, gestureState) => {
        this.animating = true;

        if (this.isAfterThreshold(gestureState.dx)) {
            if (this.state.swipingDirection === "left") {
                this.props.onLeftOptionTrigger();
            } else {
                this.props.onRightOptionTrigger();
            }
        }

        Animated.timing(this.state.animationPositionX, {
            toValue: 0,
            useNativeDriver: false
        }).start(() => {
            this.animating = false;
        });
    };

    _rightOptionsGradientStyle() {
        return [styles.containerGradient, styles.containerGradientOptionRight];
    }

    _contentStyle = () => {
        return [{ transform: [{ translateX: this.state.animationPositionX }] }];
    };

    _style = () => {
        return [styles.containerSwipeable, this.props.style];
    };

    _renderLeftOption = () => {
        return (
            <LinearGradient
                angle={this.props.leftOptionGradientAngle}
                colors={this.props.leftOptionGradientColors}
                locations={this.props.leftOptionGradientLocations}
                useAngle={true}
                style={styles.containerGradient}
            >
                <View style={styles.containerOption}>{this.props.leftOptionComponent}</View>
            </LinearGradient>
        );
    };

    _renderRightOption = () => {
        return (
            <LinearGradient
                angle={this.props.rightOptionGradientAngle}
                colors={this.props.rightOptionGradientColors}
                locations={this.props.rightOptionGradientLocations}
                useAngle={true}
                style={this._rightOptionsGradientStyle()}
            >
                <View style={styles.containerOption}>{this.props.rightOptionComponent}</View>
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
    containerSwipeable: {},
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
    }
});
