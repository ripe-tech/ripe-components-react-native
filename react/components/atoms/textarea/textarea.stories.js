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
        const minHeight = number("Min Height", -1);
        const maxHeight = number("Max Height", -1);
        return (
            <TextArea
                value={value}
                placeholder={placeholder}
                multiline={multiline}
                minHeight={minHeight === -1 ? undefined : minHeight}
                maxHeight={maxHeight === -1 ? undefined : maxHeight}
                onValue={onValue}
            />
        );
    });
