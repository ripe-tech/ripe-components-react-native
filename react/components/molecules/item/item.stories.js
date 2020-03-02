import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text, number } from "@storybook/addon-knobs";

import { Item } from "../..";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Item", () => {
        const header = boolean("Header", false);
        const headerIcon = text("Header Icon", "happy-face");
        const headerText = text("Header Text", "New message");
        const headerDate = number("Header Date", 1337);
        return (
            <Item
                header={header}
                headerIcon={headerIcon}
                headerText={headerText}
                headerDate={headerDate}
            >
                <Text>Custom content text line</Text>
                <Text>Another custom content text line</Text>
                <Text>Yet another custom content text line</Text>
            </Item>
        );
    });
