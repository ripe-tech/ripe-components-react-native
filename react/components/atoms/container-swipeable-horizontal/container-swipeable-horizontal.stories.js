import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View, StyleSheet, Text } from "react-native";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

import { ContainerSwipeableHorizontal, Icon } from "../..";
import { baseStyles } from "../../../util";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container Swipeable Horizontal", () => {
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
                <ContainerSwipeableHorizontal
                    swipeThreshold={swipeThreshold}
                    swipeLeftEnabled={swipeLeftEnabled}
                    leftOptionComponent={leftOptionComponent}
                    leftOptionGradientColors={["#ff0000", "#ffffff"]}
                    swipeRightEnabled={swipeRightEnabled}
                    onLeftOptionTrigger={() => alert("swiped left to right")}
                    rightOptionComponent={rightOptionComponent}
                    rightOptionGradientColors={["#ff0000", "#ffffff"]}
                    onRightOptionTrigger={() => alert("swiped right to left")}
                >
                    <View style={styles.containerFiller} />
                </ContainerSwipeableHorizontal>
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
