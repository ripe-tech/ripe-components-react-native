import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import { View } from "react-native";

import { Card } from "./card";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Card", () => {
        const avatarUrl = text("Avatar Url", "http://i.pravatar.cc");
        const icon = select(
            "Icon",
            {
                Unset: null,
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            null
        );
        const shapeVariant = select(
            "shapeVariant",
            {
                Round: "round",
                Square: "square"
            },
            "round"
        );
        const title = text("Title", "John Doe");
        const _text = text("Text", "Software Engineer");
        const subtext = text("Text Secondary", "Portugal");
        return (
            <View style={{ alignItems: "center", flex: 1, padding: 10 }}>
                <Card
                    avatarURL={avatarUrl}
                    icon={icon}
                    shapeVariant={shapeVariant}
                    title={title}
                    text={_text}
                    subtext={subtext}
                />
            </View>
        );
    });
