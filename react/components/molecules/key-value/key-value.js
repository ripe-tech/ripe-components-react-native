import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { ButtonIcon } from "../../atoms";

export class KeyValue extends PureComponent {
    static get propTypes() {
        return {
            _key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            icon: PropTypes.string,
            iconBackgroundColor: PropTypes.string,
            iconColor: PropTypes.string,
            iconSize: PropTypes.number,
            iconHeight: PropTypes.number,
            iconWidth: PropTypes.number,
            iconStrokeWidth: PropTypes.number,
            pressable: PropTypes.boolean,
            onPress: PropTypes.func,
            onButtonIconPress: PropTypes.func,
            onLongPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            icon: undefined,
            iconBackgroundColor: undefined,
            iconColor: undefined,
            iconSize: undefined,
            iconHeight: undefined,
            iconWidth: undefined,
            iconStrokeWidth: undefined,
            pressable: true,
            onPress: () => {},
            onButtonIconPress: () => {},
            onLongPress: () => {}
        };
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.keyValue}
                disabled={!this.props.pressable}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.key}>{this.props._key}</Text>
                    <Text style={styles.value}>{this.props.value}</Text>
                </View>
                {this.props.icon ? (
                    <View style={styles.iconContainer}>
                        <ButtonIcon
                            backgroundColor={this.props.iconBackgroundColor}
                            color={this.props.iconColor}
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
        paddingHorizontal: 14,
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
        letterSpacing: 0.25,
        color: "#4f7af8"
    },
    value: {
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        lineHeight: 18,
        letterSpacing: 0.25,
        color: "#223645"
    },
    iconContainer: {
        justifyContent: "center"
    },
    iconStyle: {
        alignSelf: "flex-end"
    }
});

export default KeyValue;
