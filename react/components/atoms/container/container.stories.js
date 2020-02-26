import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Container } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container", () => {
        return <Container />;
    });
