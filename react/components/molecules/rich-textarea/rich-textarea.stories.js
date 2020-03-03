import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { RichTextArea } from "../..";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("RichTextArea", () => {
        return <RichTextArea />;
    });
