import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, select, text } from "@storybook/addon-knobs";

import { Radio } from "./radio";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Radio", () => {
        const label = text("Label", "Label");
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
                checked={checked}
                disabled={disabled}
                size={size || undefined}
                variant={variant || undefined}
            />
        );
    });
