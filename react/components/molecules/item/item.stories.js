import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, text, number, select } from "@storybook/addon-knobs";

import { Item } from "./item";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Item", () => {
        const header = boolean("Header", false);
        const headerIcon = text("Header Icon", "happy-face");
        const headerText = text("Header Text", "New message");
        const headerDate = number("Header Date", 1337);
        const variant = select("Variant", { Unset: undefined, Full: "full" }, undefined);
        return (
            <Item
                header={header}
                headerIcon={headerIcon}
                headerText={headerText}
                headerDate={headerDate}
                variant={variant}
            >
                <Text>Custom content text line</Text>
                <Text>Another custom content text line</Text>
                <Text>Yet another custom content text line</Text>
            </Item>
        );
    });
