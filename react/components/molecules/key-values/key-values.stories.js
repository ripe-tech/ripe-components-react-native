import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import { KeyValues } from "./key-values";

storiesOf("Components/Molecules/Key Values", module)
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

        return <KeyValues items={items} twoColumns={twoColumns} />;
    });
