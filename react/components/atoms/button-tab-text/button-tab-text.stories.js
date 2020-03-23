import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import { ButtonTabText } from "./button-tab-text";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Tab Text", () => {
        const _text = text("Text", "User");
        const backgroundColor = text("Background Color", null);
        const disabled = boolean("Disabled", false);
        const active = boolean("Active", true);
        return (
            <ButtonTabText
                active={active}
                text={_text || undefined}
                disabled={disabled}
                backgroundColor={backgroundColor}
                onPress={() => alert("Thanks for the press!")}
            />
        );
    });
