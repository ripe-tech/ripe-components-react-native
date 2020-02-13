import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Avatar } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Avatar", () => {
        return (
            <Avatar
                image={{ uri: "https://semantic-ui.com/images/avatar2/large/matthew.png" }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
            />
        );
    });
