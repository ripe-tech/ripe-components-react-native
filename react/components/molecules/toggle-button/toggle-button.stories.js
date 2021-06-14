import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

import { ToggleButton } from "./toggle-button";

storiesOf("Components/Molecules/Toggle Button", module)
    .addDecorator(withKnobs)
    .add("Toggle Button", () => {
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
            <ToggleButton
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
