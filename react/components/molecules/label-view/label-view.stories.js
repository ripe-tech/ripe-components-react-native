import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { LabelView } from "./label-view";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Label View", () => {
        const _text = text("Text", "Label");
        return (
            <LabelView text={_text}>
                <Text>Some</Text>
                <Text>Content</Text>
            </LabelView>
        );
    });
