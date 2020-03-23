import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { TabsText } from "./tabs-text";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Tabs Text", () => {
        const tabs = [
            {
                text: "Subscribed"
            },
            { text: "New", disabled: false },
            { text: "Past", disabled: true }
        ];

        const onTabChange = tabIndex => alert(`Switched to index: ${tabIndex}`);

        return <TabsText tabs={tabs} tabSelected={0} onTabChange={onTabChange} />;
    });
