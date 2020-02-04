import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { View } from "react-native";
import { ButtonKeyboard } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Keyboard", () => {
        const onKeyPress = value => alert(value);
        const _text = text("Button Text", "8");
        const _value = text("Button Value", "Best value ever");
        const icon = select(
            "Icon",
            { None: null, Add: "add", ArrowLeft: "chevron-left" },
            "chevron-left"
        );
        const variant = select("Variant", { None: null, Clean: "clean" }, null);

        return [
            <ButtonKeyboard text={_text} value={_value} onPress={onKeyPress} key="1" />,
            <View style={{ margin: 10 }} key="2" />,
            <ButtonKeyboard
                icon={icon}
                value={_value}
                variant={variant}
                onPress={onKeyPress}
                key="3"
            />,
            <View style={{ margin: 10 }} key="4" />,
            <ButtonKeyboard icon={icon} value={_value} onPress={onKeyPress} key="5" />
        ];
    });
