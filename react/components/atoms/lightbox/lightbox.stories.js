import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, number, select } from "@storybook/addon-knobs";
import { StyleSheet, View } from "react-native";

import { Lightbox } from "./lightbox";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Lightbox", () => {
        const uri = text(
            "URI",
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2F4jkwjjrlxnr21.jpg&f=1&nofb=1"
        );
        const width = number("Width", 200);
        const height = number("Height", 150);
        const borderRadius = number("Border Radius", undefined);
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
            <View style={styles.container}>
                <Lightbox
                    uri={uri}
                    width={width}
                    height={height}
                    borderRadius={borderRadius}
                    resizeMode={resizeMode}
                />
            </View>
        );
    });

const styles = StyleSheet.create({
    container: {
        alignSelf: "center"
    }
});
