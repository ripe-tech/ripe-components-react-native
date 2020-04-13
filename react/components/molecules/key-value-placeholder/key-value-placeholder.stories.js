import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";

import { KeyValuePlaceholder } from "./key-value-placeholder";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Key Value Placeholder", () => {
        const numberOfLines = number("Number of lines", 1);
        return (
            <View>
                <KeyValuePlaceholder numberOfLines={numberOfLines} />
            </View>
        );
    });
