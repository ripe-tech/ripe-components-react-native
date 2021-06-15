import React, { PureComponent } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Icon } from "../icon";
import { Touchable } from "../touchable";

export class Button extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            text: PropTypes.string,
            icon: PropTypes.string,
            loading: PropTypes.bool,
            disabled: PropTypes.bool,
            iconStrokeWidth: PropTypes.number,
            iconColor: PropTypes.string,
            iconFillColor: PropTypes.string,
            textColor: PropTypes.string,
            backgroundColor: PropTypes.string,
            gradientAngle: PropTypes.number,
            gradientColors: PropTypes.arrayOf(PropTypes.string),
            gradientLocations: PropTypes.arrayOf(PropTypes.number),
            gradientStart: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            gradientEnd: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            onPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            icon: undefined,
            loading: false,
            disabled: false,
            iconStrokeWidth: undefined,
            iconColor: "#ffffff",
            iconFillColor: "#ffffff",
            textColor: "#ffffff",
            backgroundColor: undefined,
            gradientAngle: 62,
            gradientLocations: [0.4, 0.84],
            gradientColors: ["#4a6fe9", "#6687f6"],
            width: undefined,
            onPress: () => {},
            style: {}
        };
    }

    _style = () => {
        return [styles.button, this.props.style];
    };

    _iconStyle = () => {
        return [
            {
                marginRight: this.props.text ? 15 : 0
            }
        ];
    };

    _linearGradientStyle = () => {
        return [
            styles.container,
            { width: this.props.width },
            this.props.disabled ? styles.buttonDisabled : {}
        ];
    };

    _buttonStyle = () => {
        return [
            styles.container,
            { width: this.props.width },
            { backgroundColor: this.props.backgroundColor },
            this.props.disabled ? styles.buttonDisabled : {}
        ];
    };

    _textStyle = () => {
        return [styles.text, { color: this.props.textColor }];
    };

    _renderLoading() {
        return <ActivityIndicator style={styles.container} color="#ffffff" />;
    }

    _renderNormal() {
        return (
            <View style={styles.container} {...this.id(`button-${this.props.text}`)}>
                {this.props.icon ? (
                    <Icon
                        style={this._iconStyle()}
                        icon={this.props.icon}
                        color={this.props.iconColor}
                        fill={this.props.iconFillColor}
                        strokeWidth={this.props.iconStrokeWidth}
                    />
                ) : null}
                <Text style={this._textStyle()}>{this.props.text}</Text>
            </View>
        );
    }

    _renderButton = () => {
        const content = this.props.loading ? this._renderLoading() : this._renderNormal();

        if (this.props.backgroundColor) return <View style={this._buttonStyle()}>{content}</View>;
        return (
            <LinearGradient
                style={this._linearGradientStyle()}
                angle={this.props.gradientAngle}
                colors={this.props.gradientColors}
                locations={this.props.gradientLocations}
                useAngle={true}
            >
                {content}
            </LinearGradient>
        );
    };

    render() {
        return (
            <Touchable
                style={this._style()}
                activeOpacity={0.8}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
            >
                {this._renderButton()}
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        overflow: "hidden",
        borderRadius: 6
    },
    buttonDisabled: {
        opacity: 0.5,
        fontSize: 120
    },
    container: {
        height: 48,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 16,
        letterSpacing: 0.25,
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT_BOOK
    }
});

export default Button;
