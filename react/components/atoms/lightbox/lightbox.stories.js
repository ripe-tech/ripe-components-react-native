import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import { Lightbox } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Lightbox", () => {
        const src = text(
            "Image Source",
            "https://id.platforme.com/admin/accounts/t-ms%40platforme.com/avatar"
        );
        const width = number("Width", 200);
        const height = number("Height", 150);
        const borderRadius = number("Border Radius", undefined);
        return <Lightbox src={src} width={width} height={height} borderRadius={borderRadius} />;
    });
