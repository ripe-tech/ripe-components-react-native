import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, number } from "@storybook/addon-knobs";

import { Button } from "./button";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button", () => {
        const _text = text("Button Text", "Use Platforme ID");
        const icon = select(
            "Icon",
            { None: undefined, Id: "id", Add: "add", Alarm: "alarm", Bell: "bell" },
            "id"
        );
        const iconStrokeWidth = number("Icon Stroke Width", 0.5);
        const width = number("Width", undefined);
        return (
            <Button
                text={_text || undefined}
                icon={icon}
                width={width || undefined}
                iconStrokeWidth={iconStrokeWidth || undefined}
            />
        );
    });
