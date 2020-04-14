import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";

import { KeyValuesPlaceholder } from "./key-values-placeholder";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Key Values Placeholder", () => {
        const numberOfItems = number("Number of items", 2);
        const placeholderColors = ["#dbdee5", "#e3e6ed", "#dbdee5"];
        const placeholderLocations = [0, 0.3, 0.4];
        return (
            <KeyValuesPlaceholder
                numberOfItems={numberOfItems}
                colors={placeholderColors}
                locations={placeholderLocations}
            />
        );
    });
