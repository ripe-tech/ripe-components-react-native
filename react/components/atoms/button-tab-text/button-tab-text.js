import React, { PureComponent } from "react";
import { StyleSheet, Platform, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import { baseStyles } from "../../../util";

export class ButtonTabText extends PureComponent {
    static get propTypes() {
        return {
            active: PropTypes.bool,
            backgroundColor: PropTypes.string,
            color: PropTypes.string,
            onPress: PropTypes.func,
            text: PropTypes.string,
            disabled: PropTypes.bool
        };
    }

    static get defaultProps() {
        return {
            active: false,
            backgroundColor: "#f6f7f9",
            color: "#162633",
            onPress: undefined,
            text: undefined,
            disabled: false
        };
    }

    _style() {
        return [styles.tabsText, { backgroundColor: this.props.backgroundColor }, this.props.style];
    }

    _styleText() {
        return [
            styles.text,
            { color: this.props.color },
            !this.props.active && styles.textUnselected
        ];
    }

    render() {
        return (
            <TouchableOpacity
                style={this._style()}
                onPress={this.props.onPress}
                disabled={this.props.disabled}
            >
                <Text style={this._styleText()}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    tabsText: {
        paddingVertical: 16,
        paddingHorizontal: 4,
        alignItems: "center"
    },
    text: {
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        letterSpacing: 0.5,
        textAlign: "center"
    },
    textUnselected: {
        color: "#a4adb5"
    }
});
