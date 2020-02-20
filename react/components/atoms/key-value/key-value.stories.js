import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { KeyValue } from "./key-value";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Key Value", () => {
        const key = text("Key", "Key");
        const value = text("Value", "Value");
        return <KeyValue _key={key} value={value} />;
    });
