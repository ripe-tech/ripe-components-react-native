import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text, number } from "@storybook/addon-knobs";

import { Container } from "../../";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Container", () => {
        const header = boolean("Header", false);
        const headerIcon = text("Header Icon", "happy-face");
        const headerDate = number("Header Date", 1337);
        return (
            <Container header={header} headerIcon={headerIcon} headerDate={headerDate}>
                <Text>Custom content text line</Text>
                <Text>Another custom content text line</Text>
                <Text>Yet another custom content text line</Text>
            </Container>
        );
    });
