import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number, select, text } from "@storybook/addon-knobs";

import { Select } from "./select";

storiesOf("Components/Molecules/Select", module)
    .addDecorator(withKnobs)
    .add("Select", () => {
        const placeholder = text("Placeholder", "This is a placeholder text");
        const autoScroll = boolean("autoScroll", true);
        const options = [
            { value: "option_1", label: "A" },
            { value: "option_2", label: "B" },
            { value: "option_3", label: "C" },
            { value: "option_4", label: "D" },
            { value: "option_5", label: "E" },
            { value: "option_6", label: "F" },
            { value: "option_7", label: "G" },
            { value: "option_8", label: "H" },
            { value: "option_9", label: "I" },
            { value: "option_10", label: "J" },
            { value: "option_11", label: "K" },
            { value: "option_12", label: "L" },
            { value: "option_13", label: "M" },
            { value: "option_14", label: "N" },
            { value: "option_15", label: "O" },
            { value: "option_16", label: "P" },
            { value: "option_17", label: "Q" },
            { value: "option_18", label: "R" },
            { value: "option_19", label: "S" }
        ];
        const value = select(
            "Value",
            {
                None: undefined,
                A: "option_1",
                B: "option_2",
                C: "option_3"
            },
            undefined
        );
        const visible = boolean("Visible", false);
        const disabled = boolean("Disabled", false);
        const align = select(
            "Align",
            {
                None: undefined,
                Left: "left",
                Right: "right"
            },
            undefined
        );
        const direction = select(
            "Direction",
            {
                None: undefined,
                Top: "top",
                Bottom: "bottom"
            },
            undefined
        );
        const width = number("Width", -1);
        const maxHeight = number("Max Height", 206);
        const dropdownMinWidth = number("Dropdown Min Width", -1);
        const dropdownMaxWidth = number("Dropdown Max Width", -1);

        return (
            <Select
                placeholder={placeholder}
                autoScroll={autoScroll}
                options={options}
                value={value}
                disabled={disabled}
                visible={visible}
                align={align}
                direction={direction}
                width={width === -1 ? undefined : width}
                maxHeight={maxHeight}
                dropdownMinWidth={dropdownMinWidth === -1 ? undefined : dropdownMinWidth}
                dropdownMaxWidth={dropdownMaxWidth === -1 ? undefined : dropdownMaxWidth}
            />
        );
    });
