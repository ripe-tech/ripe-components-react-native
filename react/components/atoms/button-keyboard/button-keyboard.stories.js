import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { View } from "react-native";
import { ButtonKeyboard } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Keyboard", () => {
        const onKeyPress = value => alert(value);
        const _text = text("Text", "8");
        const _value = text("Value", "Best value ever");
        const icon = select(
            "Icon",
            { None: null, Add: "add", "Chevron Left": "chevron-left" },
            "chevron-left"
        );
        const variant = select("Variant", { None: null, Clean: "clean" }, null);

        return (
            <View style={{ flex: 1 }}>
                <ButtonKeyboard
                    text={_text}
                    value={_value}
                    onPress={onKeyPress}
                    style={{ margin: 10 }}
                />
                <ButtonKeyboard
                    icon={icon}
                    value={_value}
                    variant={variant}
                    onPress={onKeyPress}
                    style={{ margin: 10 }}
                />
                <ButtonKeyboard
                    icon={icon}
                    value={_value}
                    onPress={onKeyPress}
                    style={{ margin: 10 }}
                />
            </View>
        );
    });
