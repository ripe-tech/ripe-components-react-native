import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text, select } from "@storybook/addon-knobs";
import { ButtonIcon } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Icon", () => {
        const icon = select("Icon", { Add: "add", Alarm: "alarm", Bell: "bell" }, "add");
        const color = text("Color", "#ffffff");
        const backgroundColor = text("Background Color", "#000000");
        const height = number("Icon Height", 20);
        const width = number("Icon Width", 20);
        const size = number("Size", 30);
        const strokeWidth = number("Icon Stroke Width", 1);
        return (
            <ButtonIcon
                icon={icon}
                color={color}
                backgroundColor={backgroundColor}
                size={size}
                iconStrokeWidth={strokeWidth}
                iconHeight={height}
                iconWidth={width}
                onPress={() => alert("Amazing press!")}
            />
        );
    });
