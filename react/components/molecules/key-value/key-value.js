import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles, toClipboard } from "../../../util";

import { ButtonIcon, Touchable } from "../../atoms";

export class KeyValue extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            _key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            keyColor: PropTypes.string,
            valueColor: PropTypes.string,
            border: PropTypes.string,
            icon: PropTypes.string,
            iconBackgroundColor: PropTypes.string,
            iconColor: PropTypes.string,
            iconSize: PropTypes.number,
            iconHeight: PropTypes.number,
            iconWidth: PropTypes.number,
            iconStrokeWidth: PropTypes.number,
            pressable: PropTypes.bool,
            clipboard: PropTypes.bool,
            onPress: PropTypes.func,
            onButtonIconPress: PropTypes.func,
            onLongPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            keyColor: "#4f7af8",
            valueColor: "#223645",
            border: "soft",
            icon: undefined,
            iconBackgroundColor: undefined,
            iconColor: undefined,
            iconSize: undefined,
            iconHeight: undefined,
            iconWidth: undefined,
            iconStrokeWidth: undefined,
            pressable: false,
            clipboard: false,
            onPress: () => {},
            onButtonIconPress: () => {},
            onLongPress: () => {},
            style: {}
        };
    }

    _keyStyle = () => {
        return [styles.key, { color: this.props.keyColor }];
    };

    _valueStyle = () => {
        return [styles.value, { color: this.props.valueColor }];
    };

    _borderStyle = () => {
        switch (this.props.border) {
            case "none":
                return { borderBottomWidth: 0 };
            case "hard":
                return { borderBottomWidth: 1, borderBottomColor: "#a7abb4" };
            case "soft":
                return { borderBottomWidth: 1, borderBottomColor: "#e4e8f0" };
        }
    };

    _onPress = () => {
        this.props.onPress(this.props._key, this.props.value);
    };

    _onLongPress = () => {
        if (this.props.clipboard) toClipboard(this.props.value);
        this.props.onLongPress(this.props._key, this.props.value);
    };

    _style = () => {
        return [styles.keyValue, this._borderStyle(), this.props.style];
    };

    render() {
        return (
            <Touchable
                style={this._style()}
                disabled={!this.props.pressable}
                onPress={this._onPress}
                onLongPress={this._onLongPress}
            >
                <View style={styles.textContainer} {...this.id("key-value")}>
                    <Text style={this._keyStyle()} {...this.id("key-value-key")}>
                        {this.props._key}
                    </Text>
                    {this.props.children ? (
                        this.props.children
                    ) : (
                        <Text style={this._valueStyle()} {...this.id("key-value-value")}>
                            {this.props.value}
                        </Text>
                    )}
                </View>
                {this.props.icon ? (
                    <View style={styles.iconContainer}>
                        <ButtonIcon
                            backgroundColor={this.props.iconBackgroundColor}
                            iconStrokeColor={this.props.iconColor}
                            icon={this.props.icon}
                            iconHeight={this.props.iconHeight}
                            iconWidth={this.props.iconWidth}
                            size={this.props.iconSize}
                            iconStrokeWidth={this.props.iconStrokeWidth}
                            style={styles.iconStyle}
                            onPress={this.props.onButtonIconPress}
                        />
                    </View>
                ) : null}
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    keyValue: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 16
    },
    textContainer: {
        alignSelf: "flex-start",
        flex: 1
    },
    key: {
        marginTop: Platform.OS === "ios" ? 2 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 14,
        lineHeight: 18,
        marginBottom: Platform.OS === "ios" ? 2 : 6
    },
    value: {
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        lineHeight: 18
    },
    iconContainer: {
        justifyContent: "center"
    },
    iconStyle: {
        alignSelf: "flex-end"
    }
});

export default KeyValue;
