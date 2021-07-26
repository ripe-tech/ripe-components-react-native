import React from "react";
import { View } from "react-native";

import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Listing } from "../listing";
import { Card } from "../../molecules";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Listing", () => {
        const getItems = () => [
            {
                id: 1,
                avatar_url: "http://i.pravatar.cc",
                meta: {
                    name: "User 1"
                }
            },
            {
                id: 2,
                avatar_url: "http://i.pravatar.cc",
                meta: {
                    name: "User 2"
                }
            },
            {
                id: 3,
                avatar_url: "http://i.pravatar.cc",
                meta: {
                    name: "User 3"
                }
            },
            {
                id: 4,
                avatar_url: "http://i.pravatar.cc",
                meta: {
                    name: "User 4"
                }
            },
            {
                id: 5,
                avatar_url: "http://i.pravatar.cc",
                meta: {
                    name: "User 5"
                }
            },
            {
                id: 6,
                avatar_url: "http://i.pravatar.cc",
                meta: {
                    name: "User 6"
                }
            }
        ];
        const filters = [
            {
                value: "dummy",
                placeholder: "Dummy Filter",
                width: 150,
                options: [
                    { label: "Value 1", value: 1 },
                    { label: "Value 2", value: 2 },
                    { label: "Value 3", value: 3 }
                ]
            }
        ];
        const renderItem = (item, index) => {
            return (
                <Card
                    style={{ paddingHorizontal: 15, marginBottom: 10 }}
                    avatarURL={item.avatar_url}
                    title={item.meta.name}
                    key={index}
                />
            );
        };

        return (
            <View style={{ flex: 1, paddingVertical: 15, backgroundColor: "#f6f7f9" }}>
                <Listing items={() => getItems()} renderItem={renderItem} filters={filters} />
            </View>
        );
    });
