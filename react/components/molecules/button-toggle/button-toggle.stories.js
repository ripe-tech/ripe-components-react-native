import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

import { ButtonToggle } from "./button-toggle";

storiesOf("Components/Molecules/Button Toggle", module)
    .addDecorator(withKnobs)
    .add("Button Toggle", () => {
        const _text = text("Text", undefined);
        const icon = select(
            "Icon",
            {
                Unset: undefined,
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            "add"
        );
        const iconSecondary = select(
            "Inactive Icon",
            {
                Unset: undefined,
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            "add"
        );
        const color = text("Color", undefined);
        const colorSecondary = text("Active Color", undefined);
        const orientation = select(
            "Orientation",
            {
                Unset: undefined,
                Left: "left",
                Middle: "middle",
                Right: "right"
            },
            undefined
        );
        const value = boolean("Value", false);

        return (
            <ButtonToggle
                text={_text}
                icon={icon}
                iconSecondary={iconSecondary}
                color={color}
                colorSecondary={colorSecondary}
                orientation={orientation}
                value={value}
            />
        );
    });
