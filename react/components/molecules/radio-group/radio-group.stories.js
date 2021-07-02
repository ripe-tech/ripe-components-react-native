import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

import { RadioGroup } from "./radio-group";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Radio Group", () => {
        const items = [
            {
                label: "Margherita",
                value: "margherita",
                disabled: true
            },
            {
                value: "bbq_chicken",
                label: "BBQ chicken"
            },
            {
                label: "Pepperoni",
                value: "pepperoni",
                disabled: true
            },
            {
                value: "hawaiian",
                label: "Hawaiian w/ pineapple"
            }
        ];
        const value = select(
            "Value",
            {
                Nothing: null,
                Margherita: "margherita",
                "BBQ chicken": "bbq_chicken",
                Pepperoni: "pepperoni",
                "Hawaiian w/ pineapple": "hawaiian"
            },
            null
        );
        const error = boolean("Error", false);
        const disabled = boolean("Disabled", false);

        return <RadioGroup items={items} value={value} error={error} disabled={disabled} />;
    });
