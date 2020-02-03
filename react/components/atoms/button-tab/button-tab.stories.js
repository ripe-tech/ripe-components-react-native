import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";
import { View, StyleSheet } from "react-native";
import { ButtonTab } from "../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("ButtonTab", () => {
        const avatarBlue = require("../../../assets/blue/ic-avatar.png");
        const avatarGray = require("../../../assets/gray/ic-avatar.png");
        const buttonText = text("Button Text", "User");
        const buttonDisabled = boolean("Disabled", false);
        const icon = select("Icon", { None: null, Avatar: avatarGray }, avatarGray);
        const iconSelected = select(
            "Icon Selected",
            { None: null, Avatar: avatarBlue },
            avatarBlue
        );
        const selected = boolean("Selected", true);
        const onPress = () => alert("Clicked");
        return (
            <View style={styles.root}>
                <ButtonTab
                    text={buttonText}
                    icon={icon}
                    iconSelected={iconSelected}
                    onPress={onPress}
                    selected={selected}
                    disabled={buttonDisabled}
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
