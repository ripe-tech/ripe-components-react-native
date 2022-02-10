import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { capitalize } from "ripe-commons-native";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Touchable } from "../touchable";

export class ButtonTabText extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            active: PropTypes.bool,
            color: PropTypes.string,
            colorSelected: PropTypes.string,
            backgroundColor: PropTypes.string,
            backgroundColorSelected: PropTypes.string,
            text: PropTypes.string,
            disabled: PropTypes.bool,
            activeOpacity: PropTypes.number,
            variant: PropTypes.string,
            onPress: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            active: false,
            color: "#c8cdd2",
            colorSelected: "#00435e",
            backgroundColor: "#f6f7f9",
            backgroundColorSelected: "#4f7af8",
            text: undefined,
            disabled: false,
            activeOpacity: 0.5,
            variant: undefined,
            onPress: undefined,
            style: {},
            styles: styles
        };
    }

    _style = () => {
        return [
            styles.buttonTabText,
            styles[`buttonTabText${capitalize(this.props.variant)}`],
            { backgroundColor: this.props.backgroundColor },
            this.props.variant === "colored"
                ? {
                      backgroundColor: this.props.active
                          ? this.props.backgroundColorSelected
                          : this.props.backgroundColor,
                      borderTopColor: this.props.active
                          ? this.props.backgroundColorSelected
                          : "#e4e8f0",
                      borderBottomColor: this.props.active
                          ? this.props.backgroundColorSelected
                          : "#e4e8f0",
                      borderLeftColor: this.props.active
                          ? this.props.backgroundColorSelected
                          : "#e4e8f0",
                      borderRightColor: this.props.active
                          ? this.props.backgroundColorSelected
                          : "#e4e8f0"
                  }
                : {},
            this.props.style
        ];
    };

    _touchableStyle = () => {
        return [styles.touchable];
    };

    _textStyle = () => {
        return [
            styles.text,
            styles[`text${capitalize(this.props.variant)}`],
            {
                color: this.props.color
            },
            this.props.disabled ? styles.textDisabled : {},
            { color: this.props.active ? this.props.colorSelected : this.props.color }
        ];
    };

    render() {
        return (
            <View style={this._style()}>
                <Touchable
                    style={this._touchableStyle()}
                    disabled={this.props.disabled}
                    activeOpacity={this.props.activeOpacity}
                    onPress={this.props.onPress}
                >
                    <Text style={this._textStyle()} {...this.id("button-tab-text")}>
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
    buttonTabTextCompact: {
        flex: 1,
        paddingHorizontal: 16
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
    textCompact: {
        fontSize: 14,
        lineHeight: 18
    },
    textDisabled: {
        opacity: 0.4
    }
});
