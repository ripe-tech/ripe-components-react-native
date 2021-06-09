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
                Id: "id",
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            "id"
        );
        const iconSecondary = select(
            "Inactive Icon",
            {
                Unset: undefined,
                IdBlue: "id-blue",
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            "id-blue"
        );
        const color = text("Color", "#f4f5f7");
        const colorSecondary = text("Active Color", "#4a6fe9");
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
        const active = boolean("Active", false);
        const loading = boolean("Loading", false);
        const disabled = boolean("Disabled", false);

        return (
            <ToggleButton
                text={_text}
                icon={icon}
                iconSecondary={iconSecondary}
                color={color}
                colorSecondary={colorSecondary}
                orientation={orientation}
                active={active}
                loading={loading}
                disabled={disabled}
            />
        );
    });
