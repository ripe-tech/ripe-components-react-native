import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { SectionView } from "./section-view";

storiesOf("Components/Molecules/Section View", module)
    .addDecorator(withKnobs)
    .add("Section View", () => {
        const _text = text("Text", "Label");
        return (
            <SectionView text={_text}>
                <Text>Some</Text>
                <Text>Content</Text>
            </SectionView>
        );
    });
