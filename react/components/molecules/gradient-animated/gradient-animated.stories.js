import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { GradientAnimated } from "./gradient-animated";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("GradientAnimated", () => {
        const firstColor = text("First Color", "#ff0000");
        const secondColor = text("Second Color", "#ffff00");
        const duration = number("Animation Duration", 250);

        return (
            <View>
                <GradientAnimated
                    style={{ width: 500, height: 500 }}
                    gradientColors={[firstColor, secondColor]}
                    gradientLocations={[0, 1]}
                    gradientAngle={0}
                    animationDuration={duration}
                />
            </View>
        );
    });
