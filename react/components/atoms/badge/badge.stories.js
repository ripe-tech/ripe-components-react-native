import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { Badge } from "./badge";

storiesOf("Components/Atoms/Badge", module)
    .addDecorator(withKnobs)
    .add("Badge", () => {
        const _text = text("Text", "");
        const animationDuration = number("Animation Duration", 200);
        const backgroundColor = text("Background Color", "#597cf0");
        const borderRadius = number("Border Radius", 8);
        const color = text("Color", "#ffffff");
        const count = number("Count", 22);
        return (
            <Badge
                animationDuration={animationDuration || undefined}
                backgroundColor={backgroundColor || undefined}
                borderRadius={borderRadius || 0}
                color={color || undefined}
                count={count || undefined}
                text={_text || undefined}
            />
        );
    });
