import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";

import { Avatar } from "./avatar";

storiesOf("Components/Atoms/Avatar", module)
    .addDecorator(withKnobs)
    .add("Avatar", () => {
        const size = number("Size", undefined);
        const activeOpacity = number("Active Opacity", undefined);
        const borderRadius = number("Border Radius", undefined);
        return (
            <Avatar
                image={{
                    uri: "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar"
                }}
                size={size}
                borderRadius={borderRadius}
                activeOpacity={activeOpacity}
                onPress={() => {
                    alert("Nice touch!");
                }}
            />
        );
    });
