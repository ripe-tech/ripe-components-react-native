import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";
import { StyleSheet, Alert, Text } from "react-native";

import { Touchable } from "./touchable";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Touchable", () => {
        const activeOpacity = number("Active Opacity", 0.5);
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
                disabled={disabled}
                onLongPress={onLongPress}
                onPress={onPress}
                hitSlop={hitSlop}
                useForeground={useForeground}
                style={styles.touchable}
            >
                <Text style={styles.text}>Psst! You! Press me!!</Text>
            </Touchable>
        );
    });

const styles = StyleSheet.create({
    touchable: {
        borderRadius: 4,
        backgroundColor: "#4a6fe9",
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 10
    },
    text: {
        color: "white"
    }
});
