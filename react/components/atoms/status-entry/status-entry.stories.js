import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { StatusEntry } from "./status-entry";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Status Entry", () => {
        const _text = text("Text", "");
        const status = text("Status", "created");
        const backgroundColor = text("Background Color", "");
        const borderColor = text("Border Color", "");
        const tagColor = text("Tag Color", "#17425c");
        const tagBackgroundColor = text("Tag Background Color", "#84f1bb");
        const tagBorderColor = text("Tag Border Color", "transparent");

        return (
            <StatusEntry
                status={status}
                text={_text || undefined}
                backgroundColor={backgroundColor || undefined}
                borderColor={borderColor || undefined}
                tagColor={tagColor || undefined}
                tagBackgroundColor={tagBackgroundColor || undefined}
                tagBorderColor={tagBorderColor || undefined}
            />
        );
    });
