import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";
import { View } from "react-native";
import { ButtonTab } from "./button-tab";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("ButtonTab", () => {
        const _text = text("Text", "User");
        const disabled = boolean("Disabled", false);
        const icon = select(
            "Icon",
            { None: null, Add: "add", Alarm: "alarm", Bell: "bell" },
            "add"
        );
        const selected = boolean("Selected", true);
        const onPress = () => alert("Clicked");
        return (
            <View>
                <ButtonTab
                    text={_text}
                    icon={icon}
                    onPress={onPress}
                    selected={selected}
                    disabled={disabled}
                />
            </View>
        );
    });
