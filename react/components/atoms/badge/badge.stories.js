import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import { Badge } from "./badge";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Badge", () => {
        const backgroundColor = text("Background Color", "#597cf0");
        const borderRadius = number("Border Radius", 8);
        const color = text("Color", "#ffffff");
        const count = number("Count", 22);
        const _text = text("Text", "");
        return (
            <Badge
                backgroundColor={backgroundColor || undefined}
                borderRadius={borderRadius || 0}
                color={color || undefined}
                count={count || undefined}
                text={_text || undefined}
            />
        );
    });
