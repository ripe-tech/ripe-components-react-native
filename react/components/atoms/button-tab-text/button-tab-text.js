import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { capitalize } from "ripe-commons-native";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Touchable } from "../touchable";

export class ButtonTabText extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            active: PropTypes.bool,
            backgroundColor: PropTypes.string,
            color: PropTypes.string,
            colorSelected: PropTypes.string,
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
            color: "#c8cdd2",
            colorSelected: "#00435e",
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
            this.props.active ? { ...styles.textSelected, color: this.props.colorSelected } : {}
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
        flex: 0,
        paddingVertical: 9,
        paddingHorizontal: 16
    },
    text: {
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        letterSpacing: 0.25
    },
    textCompact: {
        fontSize: 14,
        lineHeight: 18
    },
    textDisabled: {
        opacity: 0.4
    },
    textSelected: {}
});
