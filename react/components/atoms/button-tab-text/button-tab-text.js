import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles, capitalize } from "../../../util";

import { Touchable } from "../touchable";

export class ButtonTabText extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            active: PropTypes.bool,
            backgroundColor: PropTypes.string,
            color: PropTypes.string,
            text: PropTypes.string,
            disabled: PropTypes.bool,
            activeOpacity: PropTypes.number,
            variant: PropTypes.string,
            onPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            active: false,
            backgroundColor: "#f6f7f9",
            color: "#162633",
            text: undefined,
            disabled: false,
            activeOpacity: 0.5,
            variant: undefined,
            onPress: undefined,
            style: {}
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
            <Touchable
                style={this._style()}
                disabled={this.props.disabled}
                activeOpacity={this.props.activeOpacity}
                onPress={this.props.onPress}
            >
                <Text style={this._styleText()} {...this.id("button-tab-text")}>
                    {this.props.text}
                </Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    buttonTabText: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    buttonTabTextCompact: {
        paddingVertical: 9,
        paddingHorizontal: 16
    },
    text: {
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        letterSpacing: 0.25
    },
    textCompact: {
        fontFamily: baseStyles.FONT_BOLD,
        fontSize: 14,
        lineHeight: 18
    },
    textDisabled: {
        opacity: 0.4
    },
    textUnselected: {
        color: "#a4adb5",
        fontFamily: baseStyles.FONT_BOOK
    }
});
