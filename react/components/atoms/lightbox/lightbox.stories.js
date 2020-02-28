import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, number, select } from "@storybook/addon-knobs";

import { Lightbox } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Lightbox", () => {
        const onVisible = value => {
            console.log("[Lightbox]", "onVisible", value);
        };
        const uri = text(
            "Image URI",
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2F4jkwjjrlxnr21.jpg&f=1&nofb=1"
        );
        const source = text("Image Source", undefined);
        const width = number("Width", 200);
        const height = number("Height", 150);
        const borderRadius = number("Border Radius", undefined);
        const resizeMode = select(
            "Resize Mode",
            {
                None: undefined,
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
                source={source}
                width={width}
                height={height}
                borderRadius={borderRadius}
                resizeMode={resizeMode}
                onVisible={onVisible}
            />
        );
    });
