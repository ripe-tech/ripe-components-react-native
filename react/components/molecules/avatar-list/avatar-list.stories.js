import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";

import { AvatarList } from "./avatar-list";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Avatar List", () => {
        const avatars = [
            "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar",
            "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar",
            "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar",
            "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar",
            "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar"
        ];
        const showNumber = number("Show Number", 3);
        const size = number("Size", 40);

        return <AvatarList avatars={avatars} showNumber={showNumber} size={size} />;
    });
