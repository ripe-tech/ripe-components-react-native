import React from "react";

import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Profile } from "../profile";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Profile", () => {
        const account = {
            username: "dummy",
            created: 1545985018,
            enabled: true,
            modified: 1627302353,
            avatar_url: "https://id.platforme.com/admin/accounts/dummy/avatar",
            email: "dummy@dummy.com",
            meta: {
                name: "Platforme dummy",
                company_url: "https://www.platforme.com",
                company: "Platforme",
                position: "dummy"
            },
            last_login: 1627302353,
            roles: [],
            _id: "5c25dbfafddb7d00015a297b",
            type: 1,
            id: 1
        };
        return <Profile account={account} />;
    });
