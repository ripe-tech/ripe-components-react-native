import React, { PureComponent } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { baseStyles } from "../../../util";
import { ButtonIcon } from "../../";

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
            iconOnPress: PropTypes.func
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
            iconOnPress: undefined
        };
    }

    render() {
        return (
            <View style={styles.keyValue}>
                <View>
                    <Text style={styles.key}>{this.props._key}</Text>
                    <Text style={styles.value}>{this.props.value}</Text>
                </View>
                {this.props.icon ? (
                    <ButtonIcon
                        backgroundColor={this.props.iconBackgroundColor}
                        color={this.props.iconColor}
                        icon={this.props.icon}
                        iconHeight={this.props.iconHeight}
                        iconWidth={this.props.iconWidth}
                        size={this.props.iconSize}
                        iconStrokeWidth={this.props.iconStrokeWidth}
                        onPress={this.props.iconOnPress}
                    />
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyValue: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#e4e8f0"
    },
    key: {
        marginTop: Platform.OS === "ios" ? 2 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 12,
        letterSpacing: 0.5,
        color: "#4f7af8"
    },
    value: {
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        letterSpacing: 0.5,
        color: "#223645"
    }
});

export default KeyValue;
