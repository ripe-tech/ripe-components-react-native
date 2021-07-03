import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";

import { KeyValuePlaceholder } from "./key-value-placeholder";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Key Value Placeholder", () => {
        const numberOfLines = number("Number of lines", 1);
        const placeholderColors = ["#dbdee5", "#e3e6ed", "#dbdee5"];
        const placeholderLocations = [0, 0.3, 0.4];
        return (
            <KeyValuePlaceholder
                numberOfLines={numberOfLines}
                colors={placeholderColors}
                locations={placeholderLocations}
            />
        );
    });
