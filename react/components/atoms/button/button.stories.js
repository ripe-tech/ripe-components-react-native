import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, select, text } from "@storybook/addon-knobs";

import { Button } from "./button";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button", () => {
        const _text = text("Button Text", "Use Platforme ID");
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
        const loading = boolean("Loading", false);
        const disabled = boolean("Disabled", false);
        const variant = select(
            "Variant",
            {
                Unset: undefined,
                Flat: "flat"
            },
            undefined
        );
        const iconStrokeWidth = number("Icon Stroke Width", 0.5);
        const width = number("Width", -1);
        return (
            <Button
                text={_text || undefined}
                icon={icon}
                loading={loading}
                disabled={disabled}
                variant={variant}
                width={width === -1 ? undefined : width}
                iconStrokeWidth={iconStrokeWidth || undefined}
            />
        );
    });
