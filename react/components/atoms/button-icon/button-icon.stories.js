import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select, number, boolean, text } from "@storybook/addon-knobs";

import { ButtonIcon } from "./button-icon";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Icon", () => {
        const icon = select(
            "Icon",
            {
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            "add"
        );
        const size = number("Size", 30);
        const useNativeFeedback = boolean("Native Feedback", false);
        const iconStrokeColor = text("Icon Stroke Color", "#000000");
        const backgroundColor = text("Background Color", "#e8e8e8");
        const height = number("Icon Height", 20);
        const width = number("Icon Width", 20);
        const strokeWidth = number("Icon Stroke Width", 1);
        return (
            <ButtonIcon
                icon={icon}
                size={size}
                nativeFeedback={useNativeFeedback}
                iconStrokeColor={iconStrokeColor}
                backgroundColor={backgroundColor}
                iconStrokeWidth={strokeWidth}
                iconHeight={height}
                iconWidth={width}
                onPress={() => alert("Amazing press!")}
            />
        );
    });
