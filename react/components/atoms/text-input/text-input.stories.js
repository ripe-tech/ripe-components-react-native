import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, bool, text } from "@storybook/addon-knobs";

import { TextInputRipe } from "./text-input";

storiesOf("Components/Atoms/Text Input", module)
    .addDecorator(withKnobs)
    .add("Text Input", () => {
        const title = text("Tile", "");
        const value = text("Text", "");
        const hasBorder = bool("Has Border", false);
        const borderColor = text("Border Color", "#e4e8f0");
        const placeholder = text("Placeholder", "Insert text here");

        return (
            <TextInputRipe
                title={title}
                value={value}
                hasBorder={hasBorder}
                borderColor={borderColor}
                placeholder={placeholder}
            />
        );
    });
