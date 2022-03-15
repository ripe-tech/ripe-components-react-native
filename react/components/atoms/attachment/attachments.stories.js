import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import Attachment from "./attachment";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Attachment", () => {
        const filename = text("Filename", "Order_ready.pdf");
        const extension = text("Extension", "");
        const underlayColor = text("Underlay Color", "");
        const activeOpacity = number("Active Opacity", 0.8);

        return (
            <Attachment
                filename={filename || undefined}
                extension={extension || undefined}
                underlayColor={underlayColor || undefined}
                activeOpacity={activeOpacity || undefined}
            />
        );
    });
