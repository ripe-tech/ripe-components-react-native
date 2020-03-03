import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, boolean, number } from "@storybook/addon-knobs";

import { ButtonTab } from "./button-tab";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Tab", () => {
        const _text = text("Text", "User");
        const badgeCount = number("Badge Count", 999);
        const disabled = boolean("Disabled", false);
        const icon = select(
            "Icon",
            {
                Unset: undefined,
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            "add"
        );
        const selected = boolean("Selected", true);
        return (
            <ButtonTab
                text={_text || undefined}
                icon={icon}
                selected={selected}
                disabled={disabled}
                badgeCount={badgeCount}
            />
        );
    });
