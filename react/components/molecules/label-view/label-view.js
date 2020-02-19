import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class LabelView extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string.isRequired
        };
    }

    render() {
        return (
            <View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        height: 36,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        backgroundColor: "#f6f7f9",
        borderColor: "#e4e8f0",
        borderWidth: 1
    },
    text: {
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontFamily: baseStyles.FONT_BOLD,
        fontSize: 14,
        letterSpacing: 0.5,
        color: "#24425a"
    }
});

export default LabelView;
