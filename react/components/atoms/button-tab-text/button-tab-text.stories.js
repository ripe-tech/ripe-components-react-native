import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

import { ButtonTabText } from "./button-tab-text";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Tab Text", () => {
        const _text = text("Text", "User");
        const backgroundColor = text("Background Color", undefined);
        const backgroundColorSelected = text("Selected Background Color", undefined);
        const color = text("Color", undefined);
        const colorSelected = text("Selected Color", undefined);
        const disabled = boolean("Disabled", false);
        const active = boolean("Active", true);
        const variant = select(
            "Variant",
            {
                Unset: undefined,
                Compact: "compact",
                Colored: "colored"
            },
            undefined
        );

        return (
            <ButtonTabText
                active={active}
                text={_text || undefined}
                disabled={disabled}
                backgroundColor={backgroundColor}
                backgroundColorSelected={backgroundColorSelected}
                color={color}
                colorSelected={colorSelected}
                variant={variant}
                onPress={() => alert("Thanks for the press!")}
            />
        );
    });
