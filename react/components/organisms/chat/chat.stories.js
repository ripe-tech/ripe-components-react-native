import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Chat } from "../../";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Chat", () => {
        return <Chat />;
    });
