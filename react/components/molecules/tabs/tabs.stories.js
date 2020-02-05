import React from "react";
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
                icon: "add",
                disabled: true
            },
            {
                text: "Scan",
                icon: "add",
                disabled: true
            },
            {
                text: "Orders",
                icon: "add",
                disabled: false
            },
            {
                text: "Alerts",
                icon: "add",
                disabled: false
            },
            {
                text: "User",
                icon: "add",
                disabled: false
            }
        ];

        const navigation = {
            navigate: () => alert("we are going to the next route"),
            state: { index: selectedIndex }
        };

        return <Tabs navigation={navigation} tabs={tabs} />;
    });
