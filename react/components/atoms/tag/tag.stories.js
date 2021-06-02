import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, select, text } from "@storybook/addon-knobs";

import { Tag } from "./tag";

storiesOf("Components/Atoms/Tag", module)
    .addDecorator(withKnobs)
    .add("Tag", () => {
        const _text = text("Text", "Subscribed");
        const icon = select(
            "Icon",
            {
                Unset: undefined,
                Add: "add",
                "Volume Loud": "volume-loud"
            },
            "volume-loud"
        );
        const iconWidth = number("Icon Width", 14);
        const iconHeight = number("Icon Height", 14);
        const color = text("Color", "#17425c");
        const backgroundColor = text("Background Color", "#84f1bb");
        const borderColor = text("Border Color", "transparent");
        return (
            <Tag
                text={_text || undefined}
                icon={icon || undefined}
                iconWidth={iconWidth || undefined}
                iconHeight={iconHeight || undefined}
                color={color || undefined}
                backgroundColor={backgroundColor || undefined}
                borderColor={borderColor || undefined}
            />
        );
    });
