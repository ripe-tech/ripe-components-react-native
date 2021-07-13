import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

import { ButtonToggle } from "./button-toggle";

storiesOf("Molecules", module)
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
        const direction = select(
            "Direction",
            {
                Unset: undefined,
                Left: "left",
                Middle: "middle",
                Right: "right",
                Top: "top",
                Bottom: "bottom"
            },
            undefined
        );
        const variant = select(
            "Variant",
            {
                Unset: undefined,
                Flat: "flat"
            },
            undefined
        );
        const toggle = boolean("Enable toggle", true);
        const value = boolean("Value", false);

        return (
            <ButtonToggle
                text={_text}
                icon={icon}
                iconSecondary={iconSecondary}
                color={color}
                colorSecondary={colorSecondary}
                variant={variant}
                direction={direction}
                toggle={toggle}
                value={value}
            />
        );
    });
