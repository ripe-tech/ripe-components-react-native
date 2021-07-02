import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, select, text } from "@storybook/addon-knobs";

import { Icon } from "./icon";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Icon", () => {
        const icon = select(
            "Icon",
            {
                Unset: undefined,
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            "add"
        );
        const color = text("Color", "#000000");
        const fill = text("Fill", "none");
        const height = number("Height", 20);
        const width = number("Width", 20);
        return <Icon icon={icon} color={color} fill={fill} height={height} width={width} />;
    });
