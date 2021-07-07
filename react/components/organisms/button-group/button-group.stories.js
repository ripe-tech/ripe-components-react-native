import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

import { ButtonGroup } from "./button-group";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Button Group", () => {
        const items = [
            {
                value: "A",
                label: "Item 1",
                buttonProps: { icon: "add", color: "#ff0000", colorSecondary: "#00ff00" }
            },
            { value: "B", label: "Item 2" },
            { value: "C", label: "Item 3" },
            { value: "D", label: "Item 4", buttonProps: { icon: "alarm" } },
            { value: "E", label: "Item 5", disabled: true, buttonProps: { icon: "bell" } }
        ];
        const value = select(
            "Value",
            {
                Unset: undefined,
                A: "A",
                B: "B",
                C: "C",
                D: "D"
            },
            undefined
        );
        const disabled = boolean("Disabled", false);

        return <ButtonGroup items={items} value={value} disabled={disabled} />;
    });
