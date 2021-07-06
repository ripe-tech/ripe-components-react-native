import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";
import { View } from "react-native";

import { Search } from "./search";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Search", () => {
        const value = text("Value", undefined);
        const placeholder = text("Placeholder", "Search");
        return (
            <View
                style={{ alignItems: "center", flex: 1, padding: 10, backgroundColor: "#f6f7f9" }}
            >
                <Search value={value} placeholder={placeholder} />
            </View>
        );
    });
