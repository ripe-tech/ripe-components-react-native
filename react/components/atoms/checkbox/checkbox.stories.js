import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, select, text } from "@storybook/addon-knobs";

import { Checkbox } from "./checkbox";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Checkbox", () => {
        const label = text("Label", "Label");
        const icon = select(
            "Icon",
            {
                Unset: undefined,
                Minus: "minus-round"
            },
            undefined
        );
        const checked = boolean("Checked", false);
        const disabled = boolean("Disabled", false);
        const size = number("Size", 20);
        const variant = select(
            "Variant",
            {
                Unset: undefined,
                Error: "error"
            },
            undefined
        );
        return (
            <Checkbox
                label={label || undefined}
                icon={icon || undefined}
                checked={checked}
                disabled={disabled}
                size={size || undefined}
                variant={variant || undefined}
            />
        );
    });
