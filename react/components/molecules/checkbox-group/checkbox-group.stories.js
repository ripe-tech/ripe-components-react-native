import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import { CheckboxGroup } from "./checkbox-group";

storiesOf("Components/Molecules/Checkbox Group", module)
    .addDecorator(withKnobs)
    .add("Checkbox Group", () => {
        const items = [
            {
                label: "Japan",
                value: "japan"
            },
            {
                label: "Morocco",
                value: "morocco"
            },
            {
                value: "canada"
            },
            {
                label: "China",
                value: "china"
            },
            {
                label: "Dubai",
                value: "dubai"
            },
            {
                label: "Bali",
                value: "bali",
                disabled: true
            },
            {
                label: "Tibet",
                value: "tibet",
                error: true
            }
        ];
        const error = boolean("Error", false);
        const disabled = boolean("Disabled", false);

        return <CheckboxGroup items={items} error={error} disabled={disabled} />;
    });
