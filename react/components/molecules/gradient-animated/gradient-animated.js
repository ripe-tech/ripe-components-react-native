import React, { PureComponent } from "react";
import { Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { equal } from "yonius";

class GradientHelper extends PureComponent {
    static get propTypes() {
        return {
            gradientAngle: PropTypes.number,
            firstColor: PropTypes.string,
            secondColor: PropTypes.string,
            gradientLocations: PropTypes.arrayOf(PropTypes.number),
            style: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            gradientAngle: 180,
            firstColor: "rgba(51, 51, 51, 0.5)",
            secondColor: "rgba(189, 189, 189, 0.5)",
            gradientLocations: [0, 1],
            style: {}
        };
    }

    render() {
        return (
            <LinearGradient
                style={this.props.style}
                colors={[this.props.firstColor, this.props.secondColor]}
                locations={this.props.gradientLocations}
                angle={this.props.gradientAngle}
                useAngle={true}
            />
        );
    }
}

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

export class GradientAnimated extends PureComponent {
    static get propTypes() {
        return {
            gradientAngle: PropTypes.number,
            gradientColors: PropTypes.arrayOf(PropTypes.string),
            gradientLocations: PropTypes.arrayOf(PropTypes.number),
            animationDuration: PropTypes.number,
            style: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            gradientAngle: 180,
            gradientColors: ["rgba(51, 51, 51, 0.5)", "rgba(189, 189, 189, 0.5)"],
            gradientLocations: [0, 1],
            animationDuration: 250,
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            previousColors: props.gradientColors,
            colors: props.gradientColors,
            transition: new Animated.Value(0)
        };
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props.gradientColors, prevProps.gradientColors)) {
            this.setState(
                prevState => ({
                    previousColors: prevState.colors,
                    colors: this.props.gradientColors,
                    transition: new Animated.Value(0)
                }),
                () => {
                    Animated.timing(this.state.transition, {
                        toValue: 1,
                        duration: this.props.animationDuration,
                        useNativeDriver: false
                    }).start();
                }
            );
        }
    }

    render() {
        const firstColor = this.state.transition.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.previousColors[0], this.state.colors[0]]
        });

        const secondColor = this.state.transition.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.previousColors[1], this.state.colors[1]]
        });

        return (
            <AnimatedGradientHelper
                style={this.props.style}
                firstColor={firstColor}
                secondColor={secondColor}
                locations={this.props.gradientLocations}
                angle={this.props.gradientAngle}
            />
        );
    }
}
