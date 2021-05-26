import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, number, boolean } from "@storybook/addon-knobs";

import { Button } from "./button";

storiesOf("Components/Atoms/Button", module)
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
        const iconStrokeWidth = number("Icon Stroke Width", 0.5);
        const width = number("Width", 300);
        return (
            <Button
                text={_text || undefined}
                icon={icon}
                loading={loading}
                disabled={disabled}
                width={width || undefined}
                iconStrokeWidth={iconStrokeWidth || undefined}
            />
        );
    });
