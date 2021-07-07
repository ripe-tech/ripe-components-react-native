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
        const borderBottomActiveColor = text("Border Bottom ActiveColor", "#4f7af8");
        const placeholderTextColor = text("Placeholder Text Color", "#869aaa");
        const value = text("Value", undefined);
        const secureTextEntry = boolean("Secure entry", false);

        return (
            <View style={{ flex: 1 }}>
                <InputForm
                    label={label}
                    placeholder={placeholder}
                    borderBottomActiveColor={borderBottomActiveColor}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    value={value}
                />
                <InputForm
                    label={label}
                    placeholder={placeholder}
                    meta={"long"}
                    borderBottomActiveColor={borderBottomActiveColor}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    value={value}
                />
            </View>
        );
    });
