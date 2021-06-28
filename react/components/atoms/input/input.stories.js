import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";

import { Input } from "./input";

storiesOf("Components/Atoms/Input", module)
    .addDecorator(withKnobs)
    .add("Input", () => {
        const value = text("Value", undefined);
        const showBorder = boolean("Show Border", true);
        const borderColor = text("Border Color", "#e4e8f0");
        const placeholder = text("Placeholder", "Input value here");
        const height = number("Height", -1);

        return (
            <Input
                value={value}
                showBorder={showBorder}
                borderColor={borderColor}
                placeholder={placeholder}
                height={height === -1 ? undefined : height}
            />
        );
    });
