import React from "react";
import { storiesOf } from "@storybook/react-native";
import { StyleSheet, Text, View } from "react-native";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

import { baseStyles } from "../../../util";
import { Icon } from "../icon";

import { ContainerSwipeable } from "./container-swipeable";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container Swipeable", () => {
        const swipeThreshold = number("Trigger Action Threshold Value", 0.25);
        const swipeLeftEnabled = boolean("Left Option Enabled", true);
        const swipeRightEnabled = boolean("Right Option Enabled", true);
        const leftOptionComponent = (
            <View style={styles.buttonOptionContainer}>
                <Icon icon={"add"} color={"#ffffff"} height={32} width={32} />
                <Text style={styles.textOption}>Add</Text>
            </View>
        );
        const rightOptionComponent = (
            <View style={styles.buttonOptionContainer}>
                <Icon icon={"add"} color={"#ffffff"} height={32} width={32} />
                <Text style={styles.textOption}>Add</Text>
            </View>
        );
        return (
            <View>
                <ContainerSwipeable
                    swipeThreshold={swipeThreshold}
                    swipeLeftEnabled={swipeLeftEnabled}
                    leftOptionComponent={leftOptionComponent}
                    leftOptionGradientColors={["#ff0000", "#ffffff"]}
                    swipeRightEnabled={swipeRightEnabled}
                    rightOptionComponent={rightOptionComponent}
                    rightOptionGradientColors={["#ff0000", "#ffffff"]}
                    onLeftOptionTrigger={() => alert("swiped left to right")}
                    onRightOptionTrigger={() => alert("swiped right to left")}
                >
                    <View style={styles.containerFiller} />
                </ContainerSwipeable>
            </View>
        );
    });

const styles = StyleSheet.create({
    containerFiller: {
        backgroundColor: "blue",
        height: 130
    },
    buttonOptionContainer: {
        justifyContent: "space-around",
        flex: 1
    },
    textOption: {
        textAlign: "center",
        color: "#ffffff",
        fontFamily: baseStyles.FONT,
        fontSize: baseStyles.FONT_SIZE,
        letterSpacing: 0.5
    }
});
