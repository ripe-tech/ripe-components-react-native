import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select } from "@storybook/addon-knobs";
import { View } from "react-native";
import { Tab } from "../";

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
        const Tabs = [
            {
                // stack: LoginStack,
                text: "Search",
                icon: "add",
                disabled: true
            },
            {
                // stack: LoginStack,
                text: "Scan",
                icon: "add",
                disabled: true
            },
            {
                // stack: LoginStack,
                text: "Orders",
                icon: "add",
                disabled: false
            },
            {
                // stack: LoginStack,
                text: "Alerts",
                icon: "add",
                disabled: false
            },
            {
                // stack: LoginStack,
                text: "User",
                icon: "add",
                disabled: false
            }
        ];

        const navigation = {
            navigate: () => alert("we are going to the next route"),
            state: { index: selectedIndex }
        };

        return (
            <View>
                <Tab navigation={navigation} tabs={Tabs} />
            </View>
        );
    });
