import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { Input } from "../../atoms";

import { InputForm } from "./input-form";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Input Form", () => {
        const label = text("Label", "Name");
        const placeholder = text("Placeholder", "Name");
        const value = text("Value", undefined);

        return (
            <View style={{ flex: 1 }}>
                <InputForm label={label} placeholder={placeholder} value={value}>
                    <Input height={45} placeholder={placeholder} value={value} />
                </InputForm>
                <InputForm label={"Age"} placeholder={"age"} meta={"number"} value={18} />
            </View>
        );
    });
