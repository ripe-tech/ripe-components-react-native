import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";
import { View, Text } from "react-native";

import { Search } from "./search";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Search", () => {
        const value = text("Value", undefined);
        const placeholder = text("Placeholder", "Placeholder example");
        const multiline = boolean("Multiline", false);
        const textareaMinHeight = number("TextArea Min Height", -1);
        const textareaMaxHeight = number("TextArea Max Height", -1);
        const animationTime = number("Animation Time", 200);
        return (
            <View
                style={{ alignItems: "center", flex: 1, padding: 10, backgroundColor: "#f6f7f9" }}
            >
                <Search
                    value={value}
                    placeholder={placeholder}
                    multiline={multiline}
                    textareaMinHeight={textareaMinHeight === -1 ? undefined : textareaMinHeight}
                    textareaMaxHeight={textareaMaxHeight === -1 ? undefined : textareaMaxHeight}
                    animationTime={animationTime}
                />
            </View>
        );
    });
