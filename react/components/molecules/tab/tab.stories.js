import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select } from "@storybook/addon-knobs";
import { View, StyleSheet } from "react-native";
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
        const IconAvatar = require("../../../assets/gray/ic-avatar.png");
        const IconAvatarBlue = require("../../../assets/blue/ic-avatar.png");
        const Tabs = {
            Search: {
                // stack: LoginStack,
                label: "Search",
                inactiveImage: IconAvatar,
                activeImage: IconAvatarBlue,
                disabled: true
            },
            Scan: {
                // stack: LoginStack,
                label: "Scan",
                inactiveImage: IconAvatar,
                activeImage: IconAvatarBlue,
                disabled: true
            },
            Orders: {
                // stack: LoginStack,
                label: "Orders",
                inactiveImage: IconAvatar,
                activeImage: IconAvatarBlue,
                disabled: false
            },
            Alerts: {
                // stack: LoginStack,
                label: "Alerts",
                inactiveImage: IconAvatar,
                activeImage: IconAvatarBlue,
                disabled: false
            },
            User: {
                // stack: LoginStack,
                label: "User",
                inactiveImage: IconAvatar,
                activeImage: IconAvatarBlue,
                disabled: false
            }
        };

        const navigation = {
            navigate: () => alert("we are going to the next route"),
            state: { index: selectedIndex }
        };

        return (
            <View style={styles.root}>
                <Tab navigation={navigation} tabs={Tabs} />
            </View>
        );
    });

const styles = StyleSheet.create({
    root: {
        marginTop: 50
    }
});
