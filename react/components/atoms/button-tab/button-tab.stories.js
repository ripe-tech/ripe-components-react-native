import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, boolean, number, color } from "@storybook/addon-knobs";

import { ButtonTab } from "./button-tab";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Tab", () => {
        const _text = text("Text", "User");
        const badgeAnimationDuration = number("Badge AnimationDuration", 200);
        const badgeBackgroundColor = color("Badge Background Color", "red");
        const badgeCount = number("Badge Count", 999);
        const badgeCountThreshold = number("Badge Count Threshould", 99);
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
                selected={selected}
                disabled={disabled}
            />
        );
    });
