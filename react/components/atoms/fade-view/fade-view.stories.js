import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";

import { FadeView } from "./fade-view";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Fade View", () => {
        const duration = number("Duration", 500);
        return (
            <FadeView duration={duration}>
                <Text>This view will fade in nicely</Text>
            </FadeView>
        );
    });
