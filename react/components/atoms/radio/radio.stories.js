import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, select, text } from "@storybook/addon-knobs";

import { Radio } from "./radio";

storiesOf("Components/Atoms/Radio", module)
    .addDecorator(withKnobs)
    .add("Radio", () => {
        const label = text("Radio Label", "");
        const value = text("Value", "");
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
            <Radio
                label={label || undefined}
                value={value || undefined}
                checked={checked}
                disabled={disabled}
                size={size || undefined}
                variant={variant || undefined}
            />
        );
    });
