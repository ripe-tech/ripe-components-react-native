import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, select, text } from "@storybook/addon-knobs";

import { Lightbox } from "./lightbox";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Lightbox", () => {
        const uri = text("URI", "https://sandbox.platforme.com/api/compose?model=dummy");
        const width = number("Width", 200);
        const height = number("Height", 150);
        const borderRadius = number("Border Radius", -1);
        const resizeMode = select(
            "Resize Mode",
            {
                Unset: undefined,
                Cover: "cover",
                Contain: "contain",
                Stretch: "stretch",
                Center: "center"
            },
            undefined
        );

        return (
            <Lightbox
                uri={uri}
                width={width}
                height={height}
                borderRadius={borderRadius === -1 ? undefined : borderRadius}
                resizeMode={resizeMode}
            />
        );
    });
