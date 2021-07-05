import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, select, text } from "@storybook/addon-knobs";

import { ButtonIcon } from "./button-icon";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Icon", () => {
        const icon = select(
            "Icon",
            {
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            "add"
        );
        const size = number("Size", 30);
        const iconStrokeColor = text("Icon Stroke Color", "#ffffff");
        const backgroundColor = text("Background Color", "#000000");
        const height = number("Icon Height", 20);
        const width = number("Icon Width", 20);
        const strokeWidth = number("Icon Stroke Width", 1);
        const disabled = boolean("Disabled", false);

        return (
            <ButtonIcon
                icon={icon}
                size={size}
                iconStrokeColor={iconStrokeColor}
                backgroundColor={backgroundColor}
                iconStrokeWidth={strokeWidth}
                iconHeight={height}
                iconWidth={width}
                disabled={disabled}
                onPress={() => alert("Amazing press!")}
            />
        );
    });
