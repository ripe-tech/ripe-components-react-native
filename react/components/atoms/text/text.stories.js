import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { Text } from "./text";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Text", () => {
        const value = text("Value", "Text example");
        return <Text>{value}</Text>;
    });
