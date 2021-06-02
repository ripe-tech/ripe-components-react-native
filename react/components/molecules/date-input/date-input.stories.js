import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

import { DateInput } from "./date-input";

storiesOf("Components/Molecules/DateInput", module)
    .addDecorator(withKnobs)
    .add("DateInput", () => {
        const disabled = boolean("Disabled", false);
        const activeOpacity = number("Active Opacity", -1);

        return (
            <DateInput
                value={new Date()}
                disabled={disabled}
                activeOpacity={activeOpacity === -1 ? undefined : activeOpacity}
            />
        );
    });
