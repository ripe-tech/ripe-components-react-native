import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";
import { ButtonTab } from "./button-tab";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Tab", () => {
        const _text = text("Text", "User");
        const disabled = boolean("Disabled", false);
        const icon = select(
            "Icon",
            { None: undefined, Add: "add", Alarm: "alarm", Bell: "bell" },
            "add"
        );
        const selected = boolean("Selected", true);
        return (
            <ButtonTab
                text={_text || undefined}
                icon={icon}
                selected={selected}
                disabled={disabled}
            />
        );
    });
