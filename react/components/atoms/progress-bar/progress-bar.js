import React, { PureComponent } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
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
            width: undefined,
            showLabelData: this.props.showLabel,
            barWidth: new Animated.Value(this.props.currentStep / this.props.steps)
        };
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.currentStep !== this.props.currentStep ||
            prevProps.steps !== this.props.steps
        ) {
            const value = this.props.currentStep / this.props.steps;
            console.log(value);
            this.setState({ showLabelData: value === 1 ? false : this.props.showLabel });
            Animated.timing(this.state.barWidth, {
                toValue: value,
                duration: this.props.fillTransitionTime,
                easing: Easing.ease,
                useNativeDriver: false
            }).start();
        }
    }

    _onLayout = event => {
        this.setState({
            width: event.nativeEvent.layout.width
        });
    };

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
                    outputRange: [0, this.state.width || 0]
                })
            }
        ];
    };

    _textStyle = () => {
        console.log("here", this.state.showLabelData ? "100%" : 0);
        return [
            styles.text,
            {
                width: this.state.showLabelData ? "10%" : 0
            }
        ];
    };

    render() {
        return (
            <View
                style={[styles.progressBar, this.props.style]}
                {...this.id("progress-bar")}
                onLayout={this._onLayout}
            >
                <View style={styles.bar}>
                    <Animated.View style={this._barStyle()} />
                </View>
                <Text style={this._textStyle()}>{this._text()}</Text>
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
        width: "90%",
        height: 4,
        borderRadius: 2,
        backgroundColor: "#f4f5f7"
    },
    text: {
        marginLeft: 10,
        fontSize: 12,
        letterSpacing: 0.25,
        color: "#869aaa",
        fontFamily: baseStyles.FONT_BOOK
    }
});

export default ProgressBar;
