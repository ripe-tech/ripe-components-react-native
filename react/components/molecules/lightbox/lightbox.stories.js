import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, select, text } from "@storybook/addon-knobs";

import { Lightbox } from "./lightbox";

storiesOf("Components/Atoms/Lightbox", module)
    .addDecorator(withKnobs)
    .add("Lightbox", () => {
        const uri = text("URI", "https://cdn.platforme.com/images/platforme.png");
        const width = number("Width", 200);
        const height = number("Height", 150);
        const borderRadius = number("Border Radius", -1);
        const resizeModeFullScreen = select(
            "Resize Mode FullScreen",
            {
                Unset: undefined,
                Cover: "cover",
                Contain: "contain",
                Stretch: "stretch",
                Center: "center"
            },
            "contain"
        );
        const resizeMode = select(
            "Resize Mode",
            {
                Unset: undefined,
                Cover: "cover",
                Contain: "contain",
                Stretch: "stretch",
                Center: "center"
            },
            "contain"
        );
        return (
            <Lightbox
                uri={uri}
                width={width}
                height={height}
                borderRadius={borderRadius === -1 ? undefined : borderRadius}
                resizeMode={resizeMode}
                resizeModeFullScreen={resizeModeFullScreen}
            />
        );
    });
