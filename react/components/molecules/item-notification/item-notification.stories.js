import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";
import { View } from "react-native";

import { ItemNotification } from "./item-notification";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Notification Item", () => {
        const avatarUrl = text("Avatar Url", "#000000");
        const timestamp = number("Timestamp", "#000000");
        const _text = text("Text", "Username");
        const unread = boolean("Text", "Username");
        return (
            <View style={{ alignItems: "center", flex: 1 }}>
                <ItemNotification
                    text={_text}
                    timestamp={timestamp}
                    avatarUrl={avatarUrl}
                    unread={unread}
                />
            </View>
        );
    });
