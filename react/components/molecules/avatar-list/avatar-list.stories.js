import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { AvatarList } from "./avatar-list";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Avatar List", () => {
        const avatars = [
            "https://i.pravatar.cc",
            "https://i.pravatar.cc?1",
            "https://i.pravatar.cc?2",
            "https://i.pravatar.cc?3",
            "https://i.pravatar.cc?4",
            "https://i.pravatar.cc?5",
            "https://i.pravatar.cc?6",
            "https://i.pravatar.cc?7",
            "https://i.pravatar.cc?8"
        ];
        const visibleAvatars = number("Number of visible avatars", 3);
        const size = number("Size", 40);

        return <AvatarList avatars={avatars} visibleAvatars={visibleAvatars} size={size} />;
    });
