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
        const onPhotoAdded = photo => {
            console.log("[RichTextInput]", "onPhotoAdded", photo);
        };
        const onAttachmentAdded = attachment => {
            console.log("[RichTextInput]", "onAttachmentAdded", attachment);
        };
        const onSendMessage = text => {
            console.log("[RichTextInput]", "onSendMessage", text);
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
                onAttachmentAdded={onAttachmentAdded}
                onSendMessage={onSendMessage}
            />
        );
    });
