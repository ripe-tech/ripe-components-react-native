import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

import { KeyValues } from "./key-values";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Key Values", () => {
        const items = [
            { key: "E-mail", value: "gcc@platforme.com" },
            { key: "Company", value: "Platforme", border: "none" },
            { key: "Position", value: "Head of Software Development", border: "soft" },
            { key: "Birth date", value: "14/03/1993", border: "hard" },
            { key: "Nationality", value: "Portuguese" },
            {
                key: "section",
                section: [
                    { key: "section-E-mail", value: "gcc@platforme.com" },
                    { key: "section-Company", value: "Platforme", border: "none" },
                    {
                        key: "section-Position",
                        value: "Head of Software Development",
                        border: "soft"
                    },
                    { key: "section-Birth date", value: "14/03/1993", border: "hard" },
                    { key: "section-Nationality", value: "Portuguese" }
                ]
            }
        ];
        const twoColumns = boolean("Two Columns", false);
        const expanded = boolean("Expanded", false);
        const nrShowingItems = number("Items showing", 3);

        return (
            <KeyValues
                items={items}
                nrShowingItems={nrShowingItems}
                expanded={expanded}
                twoColumns={twoColumns}
            />
        );
    });
