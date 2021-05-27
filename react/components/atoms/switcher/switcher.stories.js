import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select, text, number, boolean } from "@storybook/addon-knobs";

import { Switcher } from "./switcher";

storiesOf("Components/Atoms/Switcher", module)
    .addDecorator(withKnobs)
    .add("Switcher", () => {
        const checked = boolean("Checked", false);
        const disabled = boolean("Disabled", false);
        const animationDuration = number("Animation Duration", 200);
        const checkedText = text("Checked text", "");
        const uncheckedText = text("Unchecked text", "");
        const variant = select(
            "Variant",
            {
                Unset: undefined,
                Colored: "colored",
                Grey: "grey"
            },
            "colored"
        );
        return (
            <Switcher
                variant={variant || undefined}
                checked={checked || undefined}
                disabled={checked || undefined}
                checkedText={checkedText || undefined}
                uncheckedText={uncheckedText || undefined}
                animationDuration={animationDuration || undefined}
                onValueUpdate={value => () => alert("Switcher state", value)}
            />
        );
    });
