import React, { PureComponent } from "react";
import { StyleSheet, Platform, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

import { baseStyles, capitalize } from "../../../util";

export class ButtonTabText extends PureComponent {
    static get propTypes() {
        return {
            active: PropTypes.bool,
            backgroundColor: PropTypes.string,
            color: PropTypes.string,
            text: PropTypes.string,
            disabled: PropTypes.bool,
            variant: PropTypes.string,
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            active: false,
            backgroundColor: "#f6f7f9",
            color: "#162633",
            text: undefined,
            disabled: false,
            variant: undefined,
            onPress: undefined
        };
    }

    _style() {
        return [
            styles.buttonTabText,
            styles[`buttonTabText${capitalize(this.props.variant)}`],
            { backgroundColor: this.props.backgroundColor },
            this.props.style
        ];
    }

    _styleText() {
        return [
            styles.text,
            styles[`text${capitalize(this.props.variant)}`],
            {
                color: this.props.color
            },
            this.props.disabled ? styles.textDisabled : {},
            this.props.active ? {} : styles.textUnselected
        ];
    }

    render() {
        return (
            <TouchableOpacity
                style={this._style()}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
            >
                <Text style={this._styleText()}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonTabText: {
        paddingVertical: 16,
        paddingHorizontal: 4,
        alignItems: "center"
    },
    buttonTabTextCompact: {
        paddingVertical: 9
    },
    text: {
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        letterSpacing: 0.25,
        textAlign: "center"
    },
    textCompact: {
        fontSize: 14,
        marginTop: 0
    },
    textDisabled: {
        opacity: 0.4
    },
    textUnselected: {
        color: "#a4adb5"
    }
});
