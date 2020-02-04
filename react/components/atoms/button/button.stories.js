import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, number } from "@storybook/addon-knobs";
import { View } from "react-native";
import { Button } from "./button";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button", () => {
        const _text = text("Button Text", "Press Me!");
        const icon = select(
            "Icon",
            { None: null, Add: "add", Alarm: "alarm", Bell: "bell" },
            "add"
        );
        const width = number("Width", null);
        return (
            <View>
                <Button
                    text={_text}
                    icon={icon}
                    width={Number.isInteger(width) ? width : undefined}
                />
            </View>
        );
    });
