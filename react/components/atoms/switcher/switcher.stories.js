import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, select, text } from "@storybook/addon-knobs";

import { Switcher } from "./switcher";

storiesOf("Components/Atoms/Switcher", module)
    .addDecorator(withKnobs)
    .add("Switcher", () => {
        const checked = boolean("Checked", false);
        const disabled = boolean("Disabled", false);
        const animationDuration = number("Animation Duration", -1);
        const checkedText = text("Checked Text", undefined);
        const uncheckedText = text("Unchecked Text", undefined);
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
                variant={variant}
                checked={checked}
                disabled={disabled}
                checkedText={checkedText}
                uncheckedText={uncheckedText}
                animationDuration={animationDuration === -1 ? undefined : animationDuration}
                onValueUpdate={value => () => alert("Switcher state", value)}
            />
        );
    });
