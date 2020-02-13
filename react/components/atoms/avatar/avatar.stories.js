import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Avatar } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Avatar", () => {
        return (
            <Avatar
                image={{
                    uri: "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar"
                }}
            />
        );
    });
