import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import { TextArea } from "./textarea";

storiesOf("Components/Atoms/Textarea", module)
    .addDecorator(withKnobs)
    .add("Textarea", () => {
        const onValue = value => {
            console.log("[TextArea]", "onValue", value);
        };
        const value = text("Value", undefined);
        const placeholder = text("Placeholder", "Placeholder example");
        const multiline = boolean("Multiline", false);
        const minHeight = number("Min Height", 200);
        const maxHeight = number("Max Height", 200);
        return (
            <TextArea
                value={value}
                placeholder={placeholder}
                multiline={multiline}
                minHeight={minHeight}
                maxHeight={maxHeight}
                onValue={onValue}
            />
        );
    });
