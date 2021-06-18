import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { InputAnimated } from "./input-animated";
import { Touchable } from "../touchable";

storiesOf("Components/Atoms/Input Animated", module)
    .addDecorator(withKnobs)
    .add("Input Animated", () => {
        const header = text("Header", "Name");
        const borderBottomActiveColor = text("Border Bottom ActiveColor", "#4f7af8");
        const value = text("Value", undefined);

        return (
            <Touchable
                style={{ flex: 1, padding: 5 }}
                activeOpacity={1}
                onPress={() => {
                    this.input.blur();
                }}
            >
                <InputAnimated
                    ref={el => (this.input = el)}
                    header={header}
                    borderBottomActiveColor={borderBottomActiveColor}
                    value={value}
                />
            </Touchable>
        );
    });
