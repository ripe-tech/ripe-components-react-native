import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Keyboard } from "./keyboard";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Keyboard", () => {
        const onKeyPress = value => alert(value);
        const supportedCharacters = "abcdefghijklmnopqrstuvwxyz";
        return (
            <View style={{ alignItems: "center", flex: 1 }}>
                <Keyboard onKeyPress={onKeyPress} supportedCharacters={supportedCharacters} />
            </View>
        );
    });
