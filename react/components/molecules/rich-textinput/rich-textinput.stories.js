import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import { RichTextInput } from "../..";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("RichTextInput", () => {
        const onValue = value => {
            console.log("[RichTextInput]", "onValue", value);
        };
        const onAttachmentAdded = value => {
            console.log("[RichTextInput]", "onAttachmentAdded", value);
        };
        const onAttachmentRemoved = value => {
            console.log("[RichTextInput]", "onAttachmentRemoved", value);
        };
        const onImageAdded = value => {
            console.log("[RichTextInput]", "onImageAdded", value);
        };
        const onImageRemoved = value => {
            console.log("[RichTextInput]", "onImageRemoved", value);
        };
        const onSendMessage = message => {
            console.log("[RichTextInput]", "onSendMessage", message);
        };
        const value = text("Value", undefined);
        const placeholder = text("Placeholder", "Placeholder example");
        const multiline = boolean("Multiline", false);
        const minHeight = number("Min Height", undefined);
        const maxHeight = number("Max Height", undefined);
        return (
            <RichTextInput
                value={value}
                placeholder={placeholder}
                multiline={multiline}
                minHeight={minHeight}
                maxHeight={maxHeight}
                onValue={onValue}
                onAttachmentAdded={onAttachmentAdded}
                onAttachmentRemoved={onAttachmentRemoved}
                onImageAdded={onImageAdded}
                onImageRemoved={onImageRemoved}
                onSendMessage={onSendMessage}
            />
        );
    });
