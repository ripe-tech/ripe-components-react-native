import React, { PureComponent } from "react";
import { StyleSheet, Text as RNText } from "react-native";

export class Text extends PureComponent {
    render() {
        return <RNText style={styles.text}>{this.props.children}</RNText>;
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Soleil",
        fontSize: 14,
        lineHeight: 22,
        color: "#3e566a"
    }
});

export default Text;
