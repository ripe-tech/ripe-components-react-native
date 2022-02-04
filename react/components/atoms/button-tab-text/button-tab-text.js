import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Touchable } from "../touchable";

export class ButtonTabText extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            active: PropTypes.bool,
            backgroundColor: PropTypes.string,
            backgroundColorSelected: PropTypes.string,
            color: PropTypes.string,
            colorSelected: PropTypes.string,
            text: PropTypes.string,
            disabled: PropTypes.bool,
            activeOpacity: PropTypes.number,
            onPress: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            active: false,
            backgroundColor: "#ffffff",
            backgroundColorSelected: "#4f7af8",
            color: "#00435e",
            colorSelected: "#ff0000",
            text: undefined,
            disabled: false,
            activeOpacity: 0.5,
            onPress: undefined,
            style: {},
            styles: styles
        };
    }

    _style() {
        return [
            styles.buttonTabText,
            {
                backgroundColor: this.props.active
                    ? this.props.backgroundColorSelected
                    : this.props.backgroundColor
            },
            this.props.style
        ];
    }

    _styleText() {
        return [
            styles.text,
            {
                color: this.props.color
            },
            this.props.disabled ? styles.textDisabled : {},
            { color: this.props.active ? this.props.colorSelected : this.props.color }
        ];
    }

    render() {
        return (
            <View style={this._style()}>
                <Touchable
                    style={styles.touchable}
                    disabled={this.props.disabled}
                    activeOpacity={this.props.activeOpacity}
                    onPress={this.props.onPress}
                >
                    <Text style={this._styleText()} {...this.id("button-tab-text")}>
                        {this.props.text}
                    </Text>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonTabText: {
        flex: 1
    },
    touchable: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        marginTop: Platform.OS === "ios" ? 10 : 4,
        marginBottom: 8,
        marginHorizontal: 10,
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: 16,
        letterSpacing: 0.25
    },
    textDisabled: {
        opacity: 0.4
    }
});
