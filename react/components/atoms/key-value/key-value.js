import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class KeyValue extends PureComponent {
    static get propTypes() {
        return {
            _key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        };
    }

    render() {
        return (
            <View style={styles.keyValue}>
                <Text style={styles.key}>{this.props._key}</Text>
                <Text style={styles.value}>{this.props.value}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyValue: {
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
