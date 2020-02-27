import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text as knobText } from "@storybook/addon-knobs";

import { Link } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Link", () => {
        const text = knobText("Text", "Platforme Link");
        const url = knobText("Url", "https://platforme.com/");
        return <Link text={text} url={url} />;
    });
