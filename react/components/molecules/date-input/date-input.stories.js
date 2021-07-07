import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, date, number, text } from "@storybook/addon-knobs";

import { DateInput } from "./date-input";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("DateInput", () => {
        const value = date("Date", new Date());
        const header = text("Header", "Birth Date");
        const disabled = boolean("Disabled", false);
        const activeOpacity = number("Active Opacity", -1);
        const showBorders = boolean("Show Borders", true);

        return (
            <DateInput
                value={value}
                header={header}
                disabled={disabled}
                activeOpacity={activeOpacity === -1 ? undefined : activeOpacity}
                showBorders={showBorders}
            />
        );
    });
