import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select } from "@storybook/addon-knobs";

import { ButtonKeyboard } from "./button-keyboard";

storiesOf("Components/Atoms/Button Keyboard", module)
    .addDecorator(withKnobs)
    .add("Button Keyboard", () => {
        const _text = text("Button Text", "8");
        const _value = text("Button Value", "Best value ever");
        const icon = select(
            "Icon",
            {
                Unset: undefined,
                Add: "add",
                ArrowLeft: "chevron-left"
            },
            undefined
        );
        const variant = select(
            "Variant",
            {
                Unset: undefined,
                Clean: "clean"
            },
            undefined
        );
        return <ButtonKeyboard text={_text} icon={icon} value={_value} variant={variant} />;
    });
