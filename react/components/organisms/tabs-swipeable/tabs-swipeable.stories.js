import React from "react";
import { Text, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select } from "@storybook/addon-knobs";

import { Tabs } from "../tabs";

storiesOf("Components/Organisms/Tabs", module)
    .addDecorator(withKnobs)
    .add("Tabs", () => {
        const tabs = [
            {
                text: "Activity",
                emptyText: "No activity",
                render: () => {
                    return (
                        <View>
                            <Text>This is an activity</Text>
                        </View>
                    );
                }
            },
            {
                text: "All Orders",
                emptyText: "No orders",
                render: () => {
                    return (
                        <View
                            ref={ref => {
                                this.orderRef = ref;
                            }}
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}
                        >
                            {[1, 2, 3, 4, 5].map((val, i) => (
                                <View
                                    key={val}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Text>Order {i}</Text>
                                    <Text>Active</Text>
                                </View>
                            ))}
                        </View>
                    );
                },
                scrollToTop: () => {
                    this.orderRef.scrollToOffset({ animated: true, offset: 0 });
                }
            },
            {
                text: "Profile",
                emptyText: "No profile",
                render: () => {
                    return (
                        <View>
                            <Text>John Doe</Text>
                        </View>
                    );
                }
            }
        ];
        const currentTab = select(
            "Current Tab",
            {
                Unset: undefined,
                0: "0",
                1: "1",
                2: "2"
            },
            undefined
        );

        return <Tabs tabs={tabs} currentTab={currentTab} />;
    });
