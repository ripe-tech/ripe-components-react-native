import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { Input } from "./input";

storiesOf("Components/Atoms/Input", module)
    .addDecorator(withKnobs)
    .add("Input", () => {
        const value = text("Value", undefined);
        const placeholder = text("Placeholder", "Input value here");
        const height = number("Height", -1);

        return (
            <Input
                value={value}
                placeholder={placeholder}
                height={height === -1 ? undefined : height}
            />
        );
    });
