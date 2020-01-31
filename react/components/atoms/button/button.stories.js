import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { View, StyleSheet } from "react-native";
import { Button } from "./button";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button", () => {
        const text_ = text("Text", "Press Me!");
        const icon = select(
            "Icon",
            {
                None: null,
                "Small Platform logo": require("../../../assets/small-logo.png")
            },
            null
        );
        const onPress = () => alert("Thanks for the press!");
        return (
            <View style={styles.root}>
                <Button text={text_} onPress={onPress} icon={icon} />
            </View>
        );
    });

const styles = StyleSheet.create({
    root: {
        margin: 20
    }
});
