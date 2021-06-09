import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { KeyboardNumeric } from "./keyboard-numeric";

storiesOf("Components/Molecules/Numeric Keyboard", module)
    .addDecorator(withKnobs)
    .add("Numeric Keyboard", () => {
        const onKeyPress = value => alert(value);
        return (
            <View style={{ alignItems: "center", flex: 1 }}>
                <KeyboardNumeric onKeyPress={onKeyPress} />
            </View>
        );
    });
