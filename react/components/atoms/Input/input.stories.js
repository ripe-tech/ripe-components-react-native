import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, bool, text } from "@storybook/addon-knobs";

import { InputRipe } from "./input";

storiesOf("Components/Atoms/Input", module)
    .addDecorator(withKnobs)
    .add("Input", () => {
        const header = text("Header", undefined);
        const value = text("Value", undefined);
        const hasBorder = bool("Has Border", false);
        const borderColor = text("Border Color", "#e4e8f0");
        const placeholder = text("Placeholder", undefined);

        return (
            <InputRipe
                header={header}
                value={value}
                hasBorder={hasBorder}
                borderColor={borderColor}
                placeholder={placeholder}
            />
        );
    });
