import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { AvatarLabel } from "./avatar-label";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Avatar Label", () => {
        const label = text("Label", "Name");
        const size = number("Size", -1);
        const activeOpacity = number("Active Opacity", -1);
        const borderRadius = number("Border Radius", -1);

        return (
            <AvatarLabel
                image={{
                    uri: "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar"
                }}
                label={label}
                size={size === -1 ? undefined : size}
                borderRadius={borderRadius === -1 ? undefined : borderRadius}
                activeOpacity={activeOpacity === -1 ? undefined : activeOpacity}
                onPress={() => {
                    alert("Nice touch!");
                }}
            />
        );
    });
