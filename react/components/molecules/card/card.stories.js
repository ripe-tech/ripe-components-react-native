import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";
import { View } from "react-native";

import { Card } from "./card";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Card", () => {
        const imageUrl = text(
            "Avatar Url",
            "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar"
        );
        const icon = text("Icon", "");
        const title = text("Title", "Title");
        const _text = text("Text", "Text");
        const subtext = text("Text Secondary", "Subtext");
        return (
            <View style={{ alignItems: "center", flex: 1, padding: 10 }}>
                <Card
                    avatarURL={imageUrl}
                    icon={icon}
                    title={title}
                    text={_text}
                    subtext={subtext}
                    onPress={() => {
                        alert("Pressed");
                    }}
                />
            </View>
        );
    });
