import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import { Badge } from "./badge";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Badge", () => {
        const _text = text("Text", "3");
        const height = number("Height", 16);
        const width = number("Width", 22);
        const color = text("Color", "#ffffff");
        const backgroundColor = text("Background Color", "#597cf0");
        const borderRadius = number("Border Radius", 8);
        return (
            <Badge
                text={_text || undefined}
                width={width || undefined}
                height={height || undefined}
                color={color || undefined}
                backgroundColor={backgroundColor || undefined}
                borderRadius={borderRadius || 0}
            />
        );
    });
