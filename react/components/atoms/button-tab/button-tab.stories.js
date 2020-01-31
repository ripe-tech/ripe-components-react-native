import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";
import { View, StyleSheet } from "react-native";
import { ButtonTab } from "../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("ButtonTab", () => {
        const buttonText = text("Button Text", "User");
        const buttonDisabled = boolean("Disabled", false);
        const activeImage = select(
            "Icon",
            { None: null, "Activated icon": require("../../../assets/blue/ic-avatar.png") },
            require("../../../assets/blue/ic-avatar.png")
        );
        const disableImage = select(
            "Icon",
            { None: null, "Deactivated icon": require("../../../assets/gray/ic-avatar.png") },
            require("../../../assets/gray/ic-avatar.png")
        );
        const isSelected = boolean("Is elected", true);
        const onPress = () => alert("Going To Route");
        return (
            <View style={styles.root}>
                <ButtonTab
                    label={buttonText}
                    disabled={buttonDisabled}
                    activeImage={activeImage}
                    inactiveImage={disableImage}
                    onPress={onPress}
                    selected={isSelected}
                />
            </View>
        );
    });

const styles = StyleSheet.create({
    root: {
        margin: 10,
        width: 120,
        height: 48
    }
});
