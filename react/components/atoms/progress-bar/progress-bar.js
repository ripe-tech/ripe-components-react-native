import React, { PureComponent } from "react";
import { Animated, Easing, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

export class ProgressBar extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            color: PropTypes.string,
            steps: PropTypes.number,
            currentStep: PropTypes.number,
            showLabel: PropTypes.bool,
            fillTransitionTime: PropTypes.number,
            fillTransitionMode: PropTypes.string,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            color: undefined,
            steps: 3,
            currentStep: 1,
            showLabel: false,
            fillTransitionTime: 500,
            fillTransitionMode: "ease",
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            barWidth: new Animated.Value(this.props.currentStep / this.props.steps)
        };
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.currentStep !== this.props.currentStep ||
            prevProps.steps !== this.props.steps
        ) {
            Animated.timing(this.state.barWidth, {
                toValue: this.props.currentStep / this.props.steps,
                duration: this.props.fillTransitionTime,
                easing: Easing.ease,
                useNativeDriver: false
            }).start();
        }
    }

    _text = () => {
        return `${Math.round((this.props.currentStep / this.props.steps) * 100)}%`;
    };

    _barStyle = () => {
        return [
            styles.bar,
            {
                backgroundColor: this.props.color,
                width: this.state.barWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"]
                })
            }
        ];
    };

    render() {
        return (
            <View style={[styles.progressBar, this.props.style]} {...this.id("progress-bar")}>
                <View style={styles.bar}>
                    <Animated.View style={this._barStyle()} />
                </View>
                {this.props.showLabel && <Text style={styles.text}>{this._text()}</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    progressBar: {
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center"
    },
    bar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#f4f5f7"
    },
    text: {
        textAlign: "right",
        width: 30,
        marginLeft: 5,
        fontSize: 12,
        letterSpacing: 0.25,
        color: "#869aaa",
        fontFamily: baseStyles.FONT_BOOK
    }
});

export default ProgressBar;
