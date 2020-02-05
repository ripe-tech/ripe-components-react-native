import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

import { Icon } from "../icon/icon";

export class Button extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string.isRequired,
            icon: PropTypes.string,
            gradientColors: PropTypes.arrayOf(PropTypes.string),
            gradientStart: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            gradientEnd: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
            width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            width: "100%",
            gradientStart: { x: 0, y: 0 },
            gradientEnd: { x: 0, y: 0 },
            gradientColors: ["#4a6fe9", "#6687f6"]
        };
    }

    _style = () => {
        const { style, width } = this.props;
        const base = Object.assign({}, styles.root);
        if (width) base.width = width;
        return [base, style];
    };

    _onPress = () => this.props.onPress();

    render() {
        const { icon, text } = this.props;

        return (
            <TouchableOpacity useForeground={true} style={this._style()} onPress={this._onPress}>
                <LinearGradient
                    start={this.props.gradientStart}
                    end={this.props.gradienteEnd}
                    colors={this.props.gradientColors}
                    style={styles.container}
                >
                    {icon ? <Icon icon={icon} color="#ffffff" style={styles.icon} /> : null}
                    <Text style={styles.text}>{text}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        height: 48,
        alignSelf: "flex-start"
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        marginRight: 5
    },
    text: {
        fontSize: 16,
        color: "#ffffff"
    }
});
