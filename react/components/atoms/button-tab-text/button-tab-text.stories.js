import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import { ButtonTabText } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Tab Text", () => {
        const _text = text("Text", "User");
        const _backgroundColor = text("Background Color", null);
        const _disabled = boolean("Disabled", false);
        const _active = boolean("Active", true);
        const onPress = () => alert("Thanks for the press!!!");
        return (
            <ButtonTabText
                active={_active}
                text={_text || undefined}
                disabled={_disabled}
                backgroundColor={_backgroundColor}
                onPress={onPress}
            />
        );
    });
