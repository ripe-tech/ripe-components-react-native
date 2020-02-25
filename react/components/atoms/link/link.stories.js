import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Link } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Link", () => {
        return <Link />;
    });
