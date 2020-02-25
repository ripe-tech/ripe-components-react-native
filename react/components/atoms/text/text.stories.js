import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Text } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Text", () => {
        return <Text />;
    });
