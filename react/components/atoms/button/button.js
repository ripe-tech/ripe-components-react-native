import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

export class Button extends PureComponent {
    _rootStyle = () => {
        const { containerStyle } = this.props;
        return [styles.root, containerStyle];
    };

    _gradientStart = this.props.gradientStart || { x: 0, y: 0 };

    _gradientEnd = this.props.gradienteEnd || { x: 0, y: 0 };

    _gradientColors = this.props.gradientColors || ["#4a6fe9", "#6687f6"];

    _onPress = () => this.props.onPress();

    render() {
        const { icon, text } = this.props;

        return (
            <TouchableOpacity
                useForeground={true}
                style={this._rootStyle()}
                onPress={this._onPress}
            >
                <LinearGradient
                    start={this._gradientStart}
                    end={this._gradientEnd}
                    colors={this._gradientColors}
                    style={styles.container}
                >
                    {icon ? <Image source={icon} style={styles.icon} /> : null}
                    <Text style={styles.text}>{text}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        borderRadius: 6,
        height: 48
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        marginRight: 20
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.5,
        textAlign: "center",
        color: "#ffffff"
    }
});

Button.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.number,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    gradientColors: PropTypes.arrayOf(PropTypes.string),
    gradientStart: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    gradientEnd: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    onPress: PropTypes.func.isRequired
};
