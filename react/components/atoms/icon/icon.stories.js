import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";
import { Icon } from "../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Icon", () => {
        return <Icon icon={"add"} />;
    });
