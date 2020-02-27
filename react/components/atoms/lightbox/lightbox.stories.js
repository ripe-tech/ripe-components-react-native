import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Lightbox } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Lightbox", () => {
        return (
            <Lightbox />
        );
    });
