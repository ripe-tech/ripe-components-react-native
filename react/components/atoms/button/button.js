import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

import { Icon } from "../icon/icon";

export class Button extends PureComponent {
    _gradientStart = { x: 0, y: 0 };

    _gradientEnd = { x: 1, y: 0 };

    _gradientColors = ["#4a6fe9", "#6687f6"];

    _onPress = () => this.props.onPress();

    _rootStyle = () => {
        const { style, width } = this.props;
        const base = Object.assign({}, styles.root);

        if (width) base.width = width;

        return [base, style];
    };

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
                    {icon ? <Icon icon={icon} color="#ffffff" style={styles.icon} /> : null}
                    <Text style={styles.text}>{text}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
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

Button.defaultProps = {
    width: "100%"
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onPress: PropTypes.func,
    width: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
