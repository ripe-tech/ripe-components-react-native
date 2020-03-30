import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { ButtonIcon } from "../../atoms";

export class KeyValue extends PureComponent {
    static get propTypes() {
        return {
            _key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            keyColor: PropTypes.string,
            valueColor: PropTypes.string,
            icon: PropTypes.string,
            iconBackgroundColor: PropTypes.string,
            iconColor: PropTypes.string,
            iconSize: PropTypes.number,
            iconHeight: PropTypes.number,
            iconWidth: PropTypes.number,
            iconStrokeWidth: PropTypes.number,
            pressable: PropTypes.bool,
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
            icon: undefined,
            iconBackgroundColor: undefined,
            iconColor: undefined,
            iconSize: undefined,
            iconHeight: undefined,
            iconWidth: undefined,
            iconStrokeWidth: undefined,
            pressable: false,
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

    _style = () => {
        return [styles.keyValue, this.props.style];
    };

    render() {
        return (
            <TouchableOpacity
                style={this._style()}
                disabled={!this.props.pressable}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
            >
                <View style={styles.textContainer}>
                    <Text style={this._keyStyle()}>{this.props._key}</Text>
                    <Text style={this._valueStyle()}>{this.props.value}</Text>
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
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    keyValue: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e4e8f0"
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
        marginBottom: Platform.OS === "ios" ? 2 : 6,
        letterSpacing: 0.25
    },
    value: {
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        lineHeight: 18,
        letterSpacing: 0.25
    },
    iconContainer: {
        justifyContent: "center"
    },
    iconStyle: {
        alignSelf: "flex-end"
    }
});

export default KeyValue;
