import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

import { ButtonTabText } from "./button-tab-text";

storiesOf("Components/Atoms/Button Tab Text", module)
    .addDecorator(withKnobs)
    .add("Button Tab Text", () => {
        const _text = text("Text", "User");
        const backgroundColor = text("Background Color", null);
        const disabled = boolean("Disabled", false);
        const active = boolean("Active", true);
        const variant = select(
            "Variant",
            {
                Unset: undefined,
                Compact: "compact"
            },
            undefined
        );
        return (
            <ButtonTabText
                active={active}
                text={_text || undefined}
                disabled={disabled}
                backgroundColor={backgroundColor}
                variant={variant}
                onPress={() => alert("Thanks for the press!")}
            />
        );
    });
