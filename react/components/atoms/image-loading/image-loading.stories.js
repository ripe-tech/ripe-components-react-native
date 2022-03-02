import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { ImageLoading } from "./image-loading";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Image Loading", () => {
        const uri = text("URI", "https://sandbox.platforme.com/api/compose?model=dummy");
        const width = number("Width", 200);
        const height = number("Height", 150);

        return (
            <ImageLoading
                uri={uri}
                width={width}
                height={height}
                placeholder={<View style={{ backgroundColor: "#dddddd" }} />}
            />
        );
    });
