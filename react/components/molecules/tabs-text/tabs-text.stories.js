import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

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
        const tabsBackgroundColor = text("Background Color", undefined);
        const tabsBackgroundColorSelected = text("Selected Background Color", undefined);
        const tabsColor = text("Tab Text Color", undefined);
        const tabsColorSelected = text("Selected Tab Text Color", undefined);

        const onTabChange = tabIndex => alert(`Switched to index: ${tabIndex}`);

        return (
            <TabsText
                tabs={tabs}
                tabSelected={0}
                tabsBackgroundColor={tabsBackgroundColor}
                tabsBackgroundColorSelected={tabsBackgroundColorSelected}
                tabsColor={tabsColor}
                tabsColorSelected={tabsColorSelected}
                onTabChange={onTabChange}
            />
        );
    });
