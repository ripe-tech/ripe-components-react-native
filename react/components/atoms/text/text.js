import React, { PureComponent } from "react";
import { StyleSheet, Text as RNText } from "react-native";

export class Text extends PureComponent {
    render() {
        return (
            <RNText style={styles.text}>
                Experience is the teacher of all things is the teacher of all things, experience is
                the teacher of teacher all things is the teacher of all things.
            </RNText>
        );
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
