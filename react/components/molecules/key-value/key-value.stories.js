import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, number, color } from "@storybook/addon-knobs";

import { KeyValue } from "./key-value";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Key Value", () => {
        const key = text("Key", "Key");
        const value = text("Value", "Value");
        const keyColor = color("Key Color", "#4f7af8");
        const valueColor = color("Value Color", "#223645");
        const icon = select(
            "Icon",
            { Add: "add", Alarm: "alarm", Bell: "bell", Phone: "phone", None: null },
            null
        );
        const iconBackgroundColor = color("Icon Background Color", "#000000");
        const iconColor = color("Icon Color", "#ffffff");
        const iconSize = number("Icon Size", 30);
        const iconHeight = number("Icon Height", 20);
        const iconWidth = number("Icon Width", 20);
        const iconStrokeWidth = number("Icon Stroke Width", 2);
        return (
            <KeyValue
                _key={key}
                value={value}
                icon={icon}
                keyColor={keyColor}
                valueColor={valueColor}
                iconBackgroundColor={iconBackgroundColor}
                iconColor={iconColor}
                iconSize={iconSize}
                iconHeight={iconHeight}
                iconWidth={iconWidth}
                iconStrokeWidth={iconStrokeWidth}
                clickable={true}
                onPress={() => alert("Thanks for the press!")}
                onButtonIconPress={() => alert("Thanks for pressing the icon!")}
            />
        );
    });
