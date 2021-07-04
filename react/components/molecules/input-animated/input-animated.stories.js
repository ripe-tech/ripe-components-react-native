import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import { InputAnimated } from "./input-animated";
import { Touchable } from "../../atoms";

storiesOf("Components/Molecules/Input Animated", module)
    .addDecorator(withKnobs)
    .add("Input Animated", () => {
        const label = text("Label", "Name");
        const placeholder = text("Placeholder", undefined);
        const borderBottomActiveColor = text("Border Bottom ActiveColor", "#4f7af8");
        const placeholderTextColor = text("Placeholder Text Color", "#869aaa");
        const value = text("Value", undefined);
        const secureTextEntry = boolean("Secure entry", false);

        return (
            <Touchable
                style={{ flex: 1, padding: 5 }}
                activeOpacity={1}
                onPress={() => {
                    this.input.blur();
                }}
            >
                <InputAnimated
                    ref={el => (this.input = el)}
                    label={label}
                    placeholder={placeholder}
                    borderBottomActiveColor={borderBottomActiveColor}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    value={value}
                />
            </Touchable>
        );
    });
