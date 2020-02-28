import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import { View } from "react-native";

import { Lightbox } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Lightbox", () => {
        const src = text(
            "Image Source",
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2F4jkwjjrlxnr21.jpg&f=1&nofb=1"
        );
        const width = number("Width", 200);
        const height = number("Height", 150);
        const borderRadius = number("Border Radius", undefined);
        return (
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                <Lightbox src={src} width={width} height={height} borderRadius={borderRadius} />
                <Lightbox src={src} width={width} height={height} borderRadius={borderRadius} />
                <Lightbox src={src} width={width} height={height} borderRadius={borderRadius} />
                <Lightbox src={src} width={width} height={height} borderRadius={borderRadius} />
            </View>
        );
    });
