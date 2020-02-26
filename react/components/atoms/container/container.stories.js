import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text, number } from "@storybook/addon-knobs";

import { Container } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container", () => {
        const header = boolean("Header", false);
        const headerIcon = text("Header Icon", "happy-face");
        const headerDate = number("Header Date", 1337);
        return <Container header={header} headerIcon={headerIcon} headerDate={headerDate} />;
    });
