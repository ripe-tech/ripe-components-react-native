import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, color, select } from "@storybook/addon-knobs";

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
        const _color = color("Color", "#ffffff");
        const backgroundColor = color("Background Color", "#000000");
        const height = number("Icon Height", 20);
        const width = number("Icon Width", 20);
        const strokeWidth = number("Icon Stroke Width", 1);
        return (
            <ButtonIcon
                icon={icon}
                size={size}
                color={_color}
                backgroundColor={backgroundColor}
                iconStrokeWidth={strokeWidth}
                iconHeight={height}
                iconWidth={width}
                onPress={() => alert("Amazing press!")}
            />
        );
    });
