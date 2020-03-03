import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, color } from "@storybook/addon-knobs";
import { BarAnimated } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Bar Animated", () => {
        const _color = color("Bar Color", "#000000");
        const numberOfItems = number("Number of Items", 4);
        const activeItem = number("Index of Active Item", 2);
        return <BarAnimated numberOfItems={numberOfItems} activeItem={activeItem} color={_color} />;
    });
