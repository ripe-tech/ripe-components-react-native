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
        const onPhotoAdded = source => {
            console.log("[RichTextInput]", "onPhotoAdded", source);
        };
        const onAttachmentsAdded = attachments => {
            console.log("[RichTextInput]", "onAttachmentsAdded", attachments);
        };
        const onSendMessage = messageText => {
            console.log("[RichTextInput]", "onSendMessage", messageText);
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
                onPhotoAdded={onPhotoAdded}
                onAttachmentsAdded={onAttachmentsAdded}
                onSendMessage={onSendMessage}
            />
        );
    });
