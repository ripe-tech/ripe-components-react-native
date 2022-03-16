import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { StatusEntry } from "./status-entry";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Status Entry", () => {
        const _text = text("Text", "");
        const status = text("Status", "created");
        const color = text("Color", "#17425c");
        const backgroundColor = text("Background Color", "#84f1bb");
        const borderColor = text("Border Color", "transparent");
        return (
            <StatusEntry
                status={status}
                text={_text || undefined}
                tagColor={color || undefined}
                tagBackgroundColor={backgroundColor || undefined}
                tagBorderColor={borderColor || undefined}
            />
        );
    });
