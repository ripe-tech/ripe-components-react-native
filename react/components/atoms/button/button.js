import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewPropTypes } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

import * as baseStyles from "../../../util/styles";

import { Icon } from "../icon";

export class Button extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string.isRequired,
            icon: PropTypes.string,
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
            iconStrokeWidth: undefined,
            gradientAngle: 62,
            gradientLocations: [0.4, 0.84],
            gradientColors: ["#4a6fe9", "#6687f6"],
            width: "100%",
            style: {},
            onPress: () => {}
        };
    }

    _style = () => {
        const { style, width } = this.props;
        const base = Object.assign({}, styles.root);
        if (width) base.width = width;
        return [base, style];
    };

    render() {
        const { icon, text } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                useForeground={true}
                style={this._style()}
                onPress={this.props.onPress}
            >
                <LinearGradient
                    angle={this.props.gradientAngle}
                    colors={this.props.gradientColors}
                    locations={this.props.gradientLocations}
                    useAngle={true}
                    style={styles.container}
                >
                    {icon ? (
                        <Icon
                            icon={icon}
                            color="#ffffff"
                            style={styles.icon}
                            strokeWidth={this.props.iconStrokeWidth}
                        />
                    ) : null}
                    <Text style={styles.text}>{text}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignSelf: "flex-start"
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
        marginTop: 4,
        letterSpacing: 0.5,
        color: "#ffffff",
        fontFamily: baseStyles.FONT_BOOK
    }
});
