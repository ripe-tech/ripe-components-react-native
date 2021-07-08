import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

import { KeyValues } from "./key-values";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Key Values", () => {
        const items = [
            { key: "E-mail", value: "gcc@platforme.com" },
            { key: "Company", value: "Platforme" },
            { key: "Position", value: "Head of Software Development" },
            { key: "Birth date", value: "14/03/1993" },
            { key: "Nationality", value: "Portuguese" }
        ];
        const twoColumns = boolean("Two Columns", false);
        const expanded = boolean("Expanded", false);
        const hideItems = number("Items to hide", 3);

        return (
            <KeyValues
                items={items}
                hideItems={hideItems}
                expanded={expanded}
                twoColumns={twoColumns}
            />
        );
    });
