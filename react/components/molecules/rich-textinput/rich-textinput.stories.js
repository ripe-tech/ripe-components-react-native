import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";

import { RichTextInput } from "./rich-textinput";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("RichTextInput", () => {
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
        const textareaMinHeight = number("TextArea Min Height", -1);
        const textareaMaxHeight = number("TextArea Max Height", -1);
        const animationTime = number("Animation Time", 200);
        return (
            <RichTextInput
                value={value}
                placeholder={placeholder}
                multiline={multiline}
                textareaMinHeight={textareaMinHeight === -1 ? undefined : textareaMinHeight}
                textareaMaxHeight={textareaMaxHeight === -1 ? undefined : textareaMaxHeight}
                animationTime={animationTime}
                onPhotoAdded={onPhotoAdded}
                onAttachmentsAdded={onAttachmentsAdded}
                onSendMessage={onSendMessage}
            />
        );
    });
