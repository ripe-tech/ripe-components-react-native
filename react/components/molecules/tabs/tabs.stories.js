import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select } from "@storybook/addon-knobs";

import { Tabs } from "./tabs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Tab", () => {
        const selectedIndex = select(
            "Select Tab",
            {
                "Fourth Tab": 3,
                "Fifth Tab": 4
            },
            0
        );
        const tabs = [
            {
                text: "Search",
                icon: "search",
                disabled: true
            },
            {
                text: "Scan",
                icon: "qr",
                disabled: true
            },
            {
                text: "Orders",
                icon: "inbox-alt",
                disabled: false
            },
            {
                text: "Alerts",
                icon: "bell",
                disabled: false
            },
            {
                text: "User",
                icon: "user",
                disabled: false
            }
        ];

        const navigation = {
            navigate: () => alert("we are going to the next route"),
            state: { index: selectedIndex }
        };

        return (
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Tabs navigation={navigation} tabs={tabs} />
            </View>
        );
    });
