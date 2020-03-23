import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { BarAnimated } from "./bar-animated";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Bar Animated", () => {
        const offset = number("Offset", 100);
        const width = number("Width", 50);
        const _color = text("Color", "#000000");
        return <BarAnimated offset={offset} width={width} color={_color} />;
    });
