import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { ToastMessage } from "./toast-message";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Toast Message", () => {
        const _text = text("Text", "Marked as read.");
        const linkText = text("Link Text", "Undo");
        const link = text("Link", "http://www.platforme.com");
        return (
            <SafeAreaProvider>
                <ToastMessage text={_text} linkText={linkText} link={link} />
            </SafeAreaProvider>
        );
    });
