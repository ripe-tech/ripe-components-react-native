import React, { PureComponent } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import { mix } from "yonius";
import { capitalize } from "ripe-commons-native";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Icon } from "../icon";
import { Touchable } from "../touchable";

export class Button extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            text: PropTypes.string,
            icon: PropTypes.string,
            leftIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            rightIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            leftSlot: PropTypes.any,
            rightSlot: PropTypes.any,
            loading: PropTypes.bool,
            loadingPosition: PropTypes.string,
            disabled: PropTypes.bool,
            variant: PropTypes.string,
            iconStrokeWidth: PropTypes.number,
            iconColor: PropTypes.string,
            iconFillColor: PropTypes.string,
            leftIconStrokeWidth: PropTypes.number,
            leftIconColor: PropTypes.string,
            leftIconFillColor: PropTypes.string,
            rightIconStrokeWidth: PropTypes.number,
            rightIconColor: PropTypes.string,
            rightIconFillColor: PropTypes.string,
            align: PropTypes.string,
            textColor: PropTypes.string,
            backgroundColor: PropTypes.string,
            gradientAngle: PropTypes.number,
            gradientColors: PropTypes.arrayOf(PropTypes.string),
            gradientLocations: PropTypes.arrayOf(PropTypes.number),
            gradientStart: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            gradientEnd: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            onPress: PropTypes.func,
            style: ViewPropTypes.style,
            containerStyle: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            icon: undefined,
            leftIcon: undefined,
            rightIcon: undefined,
            leftSlot: undefined,
            rightSlot: undefined,
            loading: false,
            loadingPosition: "center",
            disabled: false,
            variant: undefined,
            iconStrokeWidth: undefined,
            iconColor: "#ffffff",
            iconFillColor: "#ffffff",
            leftIconStrokeWidth: undefined,
            leftIconColor: "#ffffff",
            leftIconFillColor: "#ffffff",
            rightIconStrokeWidth: undefined,
            rightIconColor: "#ffffff",
            rightIconFillColor: "#ffffff",
            align: "center",
            textColor: undefined,
            backgroundColor: undefined,
            gradientAngle: 62,
            gradientLocations: [0.4, 0.84],
            gradientColors: ["#4a6fe9", "#6687f6"],
            width: undefined,
            onPress: () => {},
            onLongPress: () => {},
            style: {},
            containerStyle: {},
            styles: styles
        };
    }

    _align = () => {
        switch (this.props.align) {
            case "left":
                return "flex-start";
            case "right":
                return "flex-end";
            case "spacing":
                return "space-between";
            default:
                return "center";
        }
    };

    _shouldRenderView = () => {
        return this.props.backgroundColor || this.props.variant === "flat";
    };

    _style = () => {
        return [
            this.props.styles.button,
            { width: this.props.width },
            this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor } : {},
            this.props.disabled ? this.props.styles.buttonDisabled : {},
            this.props.style
        ];
    };

    _iconLeftStyle = () => {
        return [
            {
                marginRight: this.props.text ? 15 : 0
            }
        ];
    };

    _iconRightStyle = () => {
        return [
            {
                marginLeft: this.props.text ? 15 : 0
            }
        ];
    };

    _linearGradientStyle = () => {
        return [
            this.props.styles.container,
            { width: this.props.width },
            this.props.disabled ? this.props.styles.buttonDisabled : {}
        ];
    };

    _buttonStyle = () => {
        return [
            this.props.styles.container,
            this.props.styles[`container${capitalize(this.props.variant)}`],
            { width: this.props.width },
            { justifyContent: this._align() },
            this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor } : {},
            this.props.containerStyle
        ];
    };

    _textStyle = () => {
        return [
            this.props.styles.text,
            this.props.styles[`text${capitalize(this.props.variant)}`],
            this.props.textColor ? { color: this.props.textColor } : {}
        ];
    };

    _loadingStyle = () => {
        return [
            this.props.styles.container,
            {
                position: "absolute",
                justifyContent: "center",
                paddingHorizontal: 0,
                paddingVertical: 0
            },
            this.props.loadingPosition === "right"
                ? { right: 15 }
                : this.props.loadingPosition === "left"
                ? { left: 15 }
                : {}
        ];
    };

    _renderLoading() {
        switch (this.props.loadingPosition) {
            case "left":
                return (
                    <>
                        <ActivityIndicator style={this._loadingStyle()} color="#ffffff" />
                        <Text style={[this._textStyle()]}>{this.props.text}</Text>
                    </>
                );
            case "right":
                return (
                    <>
                        <Text style={[this._textStyle()]}>{this.props.text}</Text>
                        <ActivityIndicator style={this._loadingStyle()} color="#ffffff" />
                    </>
                );
            case "center":
            default:
                return (
                    <>
                        <ActivityIndicator style={this._loadingStyle()} color="#ffffff" />
                    </>
                );
        }
    }

    _renderLeft() {
        if (this.props.leftSlot) return this.props.leftSlot;
        if (this.props.leftIcon || this.props.icon)
            return (
                <Icon
                    style={this._iconLeftStyle()}
                    icon={this.props.icon || this.props.leftIcon}
                    color={this.props.iconColor || this.props.leftIconColor}
                    fill={this.props.iconFillColor || this.props.leftIconFillColor}
                    strokeWidth={this.props.iconStrokeWidth || this.props.leftIconStrokeWidth}
                />
            );
    }

    _renderRight() {
        if (this.props.rightSlot) return this.props.rightSlot;
        if (this.props.rightIcon)
            return (
                <Icon
                    style={this._iconRightStyle()}
                    icon={this.props.rightIcon}
                    color={this.props.rightIconColor}
                    fill={this.props.rightIconFillColor}
                    strokeWidth={this.props.rightIconStrokeWidth}
                />
            );
    }

    _renderNormal() {
        return (
            <>
                {this._renderLeft()}
                <Text style={this._textStyle()}>{this.props.text}</Text>
                {this._renderRight()}
            </>
        );
    }

    _renderButton = () => {
        const content = this.props.loading ? this._renderLoading() : this._renderNormal();

        if (this._shouldRenderView()) return <View style={this._buttonStyle()}>{content}</View>;
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
                onLongPress={this.props.onLongPress}
                {...this.id(`button-${this.props.text}`)}
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
        opacity: 0.5
    },
    container: {
        height: 48,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8
    },
    containerFlat: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#e4e8f0"
    },
    text: {
        fontSize: 16,
        letterSpacing: 0.25,
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT_BOOK,
        color: "#ffffff"
    },
    textFlat: {
        color: "#4f7af8"
    }
});

export default Button;
