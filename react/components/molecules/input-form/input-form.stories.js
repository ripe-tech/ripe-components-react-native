import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import { InputForm } from "./input-form";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Input Form", () => {
        const label = text("Label", "Name");
        const placeholder = text("Placeholder", undefined);
        const value = text("Value", undefined);

        return (
            <View style={{ flex: 1 }}>
                <InputForm label={label} placeholder={placeholder} value={value} />
                <InputForm label={"Age"} placeholder={"age"} meta={"number"} value={18} />
            </View>
        );
    });
