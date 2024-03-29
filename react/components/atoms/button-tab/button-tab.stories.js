import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, select, text } from "@storybook/addon-knobs";

import { ButtonTab } from "./button-tab";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Tab", () => {
        const _text = text("Text", "User");
        const badgeAnimationDuration = number("Badge Animation Duration", 200);
        const badgeBackgroundColor = text("Badge Background Color", "red");
        const badgeCount = number("Badge Count", 999);
        const badgeCountThreshold = number("Badge Count Threshold", 99);
        const badgeHasAnimation = boolean("Badge Has Animation", true);
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
        const iconSelected = select(
            "Icon Selected",
            {
                Unset: undefined,
                Add: "add",
                Alarm: "alarm",
                Bell: "bell"
            },
            "alarm"
        );
        const selected = boolean("Selected", true);
        return (
            <ButtonTab
                badgeAnimationDuration={badgeAnimationDuration || undefined}
                badgeBackgroundColor={badgeBackgroundColor || undefined}
                badgeCount={badgeCount || undefined}
                badgeCountThreshold={badgeCountThreshold || undefined}
                badgeHasAnimation={badgeHasAnimation}
                text={_text || undefined}
                icon={icon}
                iconSelected={iconSelected}
                selected={selected}
                disabled={disabled}
            />
        );
    });
