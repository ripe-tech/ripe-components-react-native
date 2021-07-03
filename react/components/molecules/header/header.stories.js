import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import { Header } from "./header";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Header", () => {
        const title = text("Title", "Title");
        const buttonLeftVisible = boolean("Button Left Visible", true);
        const buttonLeftIcon = text("Button Left Icon", undefined);
        const buttonRightIcon = text("Button Right Icon", undefined);
        return (
            <SafeAreaProvider>
                <Header
                    title={title}
                    buttonLeftVisible={buttonLeftVisible}
                    buttonLeftIcon={buttonLeftIcon}
                    buttonRightIcon={buttonRightIcon}
                />
            </SafeAreaProvider>
        );
    });
