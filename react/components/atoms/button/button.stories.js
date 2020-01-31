import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { View, StyleSheet } from "react-native";
import { Button } from "./button";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button", () => {
        const buttonText = text("Button Text", "Press Me!");
        const onPress = () => alert("Thanks for the press!");
        const iconList = select(
            "Icon",
            { None: null, "Small Platform logo": require("../../../assets/small-logo.png") },
            null
        );
        return (
            <View style={styles.root}>
                <Button text={buttonText} onPress={onPress} icon={iconList} />
            </View>
        );
    });

const styles = StyleSheet.create({
    root: {
        margin: 20
    }
});
