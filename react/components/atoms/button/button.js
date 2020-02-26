import React, { PureComponent } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ViewPropTypes,
    Platform,
    View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { Icon } from "../icon";

export class Button extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string.isRequired,
            icon: PropTypes.string,
            loading: PropTypes.bool,
            disabled: PropTypes.bool,
            iconStrokeWidth: PropTypes.number,
            gradientAngle: PropTypes.number,
            gradientColors: PropTypes.arrayOf(PropTypes.string),
            gradientLocations: PropTypes.arrayOf(PropTypes.number),
            gradientStart: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            gradientEnd: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            style: ViewPropTypes.style,
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            icon: undefined,
            loading: false,
            disabled: false,
            iconStrokeWidth: undefined,
            gradientAngle: 62,
            gradientLocations: [0.4, 0.84],
            gradientColors: ["#4a6fe9", "#6687f6"],
            width: undefined,
            style: {},
            onPress: () => {}
        };
    }

    _style = () => {
        return [
            styles.button,
            styles.container,
            this.props.style,
            this.props.disabled ? styles.buttonDisabled : {},
            this.props.width ? { width: this.props.width } : {}
        ];
    };

    _renderLoading() {
        return <ActivityIndicator color="#ffffff" />;
    }

    _renderNormal() {
        return (
            <View style={styles.container}>
                {this.props.icon ? (
                    <Icon
                        icon={this.props.icon}
                        color="#ffffff"
                        style={styles.icon}
                        strokeWidth={this.props.iconStrokeWidth}
                    />
                ) : null}
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                useForeground={true}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
            >
                <LinearGradient
                    angle={this.props.gradientAngle}
                    colors={this.props.gradientColors}
                    locations={this.props.gradientLocations}
                    useAngle={true}
                    style={this._style()}
                >
                    {this.props.loading ? this._renderLoading() : this._renderNormal()}
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {},
    buttonDisabled: {
        opacity: 0.5,
        fontSize: 120
    },
    container: {
        borderRadius: 6,
        height: 48,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        marginRight: 15
    },
    text: {
        fontSize: 16,
        letterSpacing: 0.5,
        color: "#ffffff",
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT_BOOK
    }
});

export default Button;
