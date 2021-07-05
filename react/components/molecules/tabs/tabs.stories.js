import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
                id: "search",
                text: "Search",
                icon: "search",
                disabled: true
            },
            {
                id: "scan",
                text: "Scan",
                badgeText: "•",
                icon: "qr",
                disabled: true
            },
            {
                id: "orders",
                text: "Orders",
                badgeCount: 5,
                icon: "inbox-alt",
                disabled: false
            },
            {
                id: "alerts",
                badgeCount: 999,
                badgeBackgroundColor: "red",
                text: "Alerts",
                icon: "bell",
                disabled: false
            },
            {
                id: "user",
                text: "User",
                icon: "user",
                disabled: false
            }
        ];

        const navigation = {
            navigate: () => alert("we are going to the next route")
        };

        const state = {
            index: selectedIndex,
            routeNames: ["search", "scan", "orders", "alerts", "user"]
        };

        return (
            <SafeAreaProvider style={{ flex: 1, justifyContent: "flex-end" }}>
                <Tabs navigation={navigation} state={state} tabs={tabs} />
            </SafeAreaProvider>
        );
    });
