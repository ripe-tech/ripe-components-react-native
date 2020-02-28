import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, number } from "@storybook/addon-knobs";

import { KeyValue } from "./key-value";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Key Value", () => {
        const key = text("Key", "Key");
        const value = text("Value", "Value");
        const icon = select(
            "Icon",
            { Add: "add", Alarm: "alarm", Bell: "bell", Phone: "phone", None: null },
            null
        );
        const iconBackgroundColor = text("Icon Background Color", "#000000");
        const iconColor = text("Icon Color", "#ffffff");
        const iconSize = number("Icon Size", 30);
        const iconHeight = number("Icon Height", 20);
        const iconWidth = number("Icon Width", 20);
        const iconStrokeWidth = number("Icon Stroke Width", 2);
        return (
            <KeyValue
                _key={key}
                value={value}
                icon={icon}
                iconBackgroundColor={iconBackgroundColor}
                iconColor={iconColor}
                iconSize={iconSize}
                iconHeight={iconHeight}
                iconWidth={iconWidth}
                iconStrokeWidth={iconStrokeWidth}
                onPress={() => alert("Thanks for the press!")}
            />
        );
    });
