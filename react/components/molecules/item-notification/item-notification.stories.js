import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";
import { View } from "react-native";

import { ItemNotification } from "./item-notification";

storiesOf("Components/Molecules/Notification Item", module)
    .addDecorator(withKnobs)
    .add("Notification Item", () => {
        const avatarUrl = text(
            "Avatar Url",
            "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar"
        );
        const timestamp = number("Timestamp", 1583257539);
        const _text = text("Text", "Username changed the order status to Ready");
        const unread = boolean("Unread", true);
        return (
            <View style={{ alignItems: "center", flex: 1 }}>
                <ItemNotification
                    text={_text}
                    timestamp={timestamp}
                    avatarURL={avatarUrl}
                    unread={unread}
                />
            </View>
        );
    });
