import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import { Input } from "./input";

storiesOf("Components/Atoms/Input", module)
    .addDecorator(withKnobs)
    .add("Input", () => {
        const header = text("Header", "Name");
        const value = text("Value", undefined);
        const hasBorder = boolean("Has Border", true);
        const borderColor = text("Border Color", "#e4e8f0");
        const placeholder = text("Placeholder", undefined);

        return (
            <Input
                header={header}
                value={value}
                hasBorder={hasBorder}
                borderColor={borderColor}
                placeholder={placeholder}
            />
        );
    });
