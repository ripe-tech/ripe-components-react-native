import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";
import { Alert, StyleSheet, Text } from "react-native";

import { Touchable } from "./touchable";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Touchable", () => {
        const activeOpacity = number("Active Opacity", 0.5);
        const underlayColor = text("Underlay Color", "#f3f5ff");
        const disabled = boolean("Disabled", false);
        const onLongPress = () => {
            Alert.alert("onLongPress");
        };
        const onPress = () => {
            Alert.alert("onPress");
        };
        const hitSlop = { top: 20, left: 20, right: 20, bottom: 20 };
        const useForeground = boolean("Use Foreground", false);

        return (
            <Touchable
                activeOpacity={activeOpacity}
                underlayColor={underlayColor}
                disabled={disabled}
                onLongPress={onLongPress}
                onPress={onPress}
                hitSlop={hitSlop}
                useForeground={useForeground}
                style={styles.touchable}
            >
                <Text style={styles.text}>Button Text 1</Text>
                <Text style={styles.text}>Button Text 2</Text>
                <Text style={styles.text}>Button Text 3</Text>
            </Touchable>
        );
    });

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 4,
        backgroundColor: "#4a6fe9"
    },
    text: {
        color: "white"
    }
});
