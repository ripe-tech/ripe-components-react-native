import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import { View } from "react-native";

import { Card } from "./card";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Card", () => {
        const imageUrl = text("Avatar Url", "http://i.pravatar.cc");
        const icon = select(
            "Icon",
            {
                Unset: undefined,
                Add: "add",
                Alarm: "alarm",
                Bell: "bell",
                None: null
            },
            null
        );
        const title = text("Title", "John Doe");
        const _text = text("Text", "Software Engineer");
        const subtext = text("Text Secondary", "Portugal");
        return (
            <View style={{ alignItems: "center", flex: 1, padding: 10 }}>
                <Card
                    avatarURL={imageUrl}
                    icon={icon}
                    title={title}
                    text={_text}
                    subtext={subtext}
                />
            </View>
        );
    });
