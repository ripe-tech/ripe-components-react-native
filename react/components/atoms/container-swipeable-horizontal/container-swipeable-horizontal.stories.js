import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View, StyleSheet } from "react-native";
import { withKnobs, number, text, boolean, color, select } from "@storybook/addon-knobs";

import { ContainerSwipeableHorizontal } from "../..";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container Swipeable Horizontal", () => {
        const possibleIcons = {
            Unset: undefined,
            Id: "id",
            Add: "add",
            Alarm: "alarm",
            Bell: "bell"
        };
        const swipeThreshold = number("Trigger Action Threshold Value", 0.25);
        const swipeLeftEnabled = boolean("Left Option Enabled", true);
        const leftOptionText = text("Left Option Text", "Add");
        const leftOptionTextColor = color("Left Option Text Color", "#ffffff");
        const leftOptionIcon = select("Left Option Icon", possibleIcons, "add");
        const leftOptionIconColor = color("Left Option Icon Color", "#ffffff");
        const leftOptionIconHeight = number("Left Option Icon Height", 32);
        const leftOptionIconStrokeWidth = number("Left Option Icon Stroke Width", 1);
        const swipeRightEnabled = boolean("Right Option Enabled", true);
        const rightOptionText = text("Right Option Text", "Add");
        const rightOptionTextColor = color("Right Option Text Color", "#ffffff");
        const rightOptionIcon = select("Right Option Icon", possibleIcons, "add");
        const rightOptionIconColor = color("Right Option Icon Color", "#ffffff");
        const rightOptionIconHeight = number("Right Option Icon Height", 32);
        const rightOptionIconStrokeWidth = number("Right Option Icon Stroke Width", 1);

        return (
            <View>
                <ContainerSwipeableHorizontal
                    swipeThreshold={swipeThreshold}
                    swipeLeftEnabled={swipeLeftEnabled}
                    leftOptionGradientColors={["#ff0000", "#ffffff"]}
                    leftOptionText={leftOptionText}
                    leftOptionTextColor={leftOptionTextColor}
                    leftOptionIcon={leftOptionIcon}
                    leftOptionIconColor={leftOptionIconColor}
                    leftOptionIconHeight={leftOptionIconHeight}
                    leftOptionIconStrokeWidth={leftOptionIconStrokeWidth}
                    swipeRightEnabled={swipeRightEnabled}
                    onLeftOptionTrigger={() => alert("swiped left to right")}
                    rightOptionGradientColors={["#ff0000", "#ffffff"]}
                    rightOptionText={rightOptionText}
                    rightOptionTextColor={rightOptionTextColor}
                    rightOptionIcon={rightOptionIcon}
                    rightOptionIconColor={rightOptionIconColor}
                    rightOptionIconHeight={rightOptionIconHeight}
                    rightOptionIconStrokeWidth={rightOptionIconStrokeWidth}
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
    }
});
