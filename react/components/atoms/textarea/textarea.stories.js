import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { TextArea } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Textarea", () => {
        return (
            <TextArea />
        );
    });
