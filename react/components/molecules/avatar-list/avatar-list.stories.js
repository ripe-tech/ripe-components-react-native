import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { AvatarList } from "./avatar-list";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Avatar List", () => {
        const avatars = [
            "https://i.pravatar.cc",
            "https://i.pravatar.cc",
            "https://i.pravatar.cc",
            "https://i.pravatar.cc",
            "https://i.pravatar.cc",
            "https://i.pravatar.cc",
            "https://i.pravatar.cc",
            "https://i.pravatar.cc",
            "https://i.pravatar.cc"
        ];
        const visibleAvatars = number("Number of visible avatars", 3);
        const size = number("Size", 40);

        return <AvatarList avatars={avatars} visibleAvatars={visibleAvatars} size={size} />;
    });
