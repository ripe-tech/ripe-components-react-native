import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";

import { Avatar } from "./avatar";

storiesOf("Components/Atoms/Avatar", module)
    .addDecorator(withKnobs)
    .add("Avatar", () => {
        const size = number("Size", -1);
        const activeOpacity = number("Active Opacity", -1);
        const borderRadius = number("Border Radius", -1);
        return (
            <Avatar
                image={{
                    uri: "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar"
                }}
                size={size === -1 ? size : undefined}
                borderRadius={borderRadius === -1 ? borderRadius : undefined}
                activeOpacity={activeOpacity === -1 ? activeOpacity : undefined}
                onPress={() => {
                    alert("Nice touch!");
                }}
            />
        );
    });
