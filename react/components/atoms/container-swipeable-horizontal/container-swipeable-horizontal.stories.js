import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View, StyleSheet } from "react-native";
import { withKnobs, number, text, boolean, color, select } from "@storybook/addon-knobs";

import { ContainerSwipeableHorizontal } from "../..";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container Swipeable Horizontal", () => {
        const triggerActionThreshold = number("Trigger Action Threshold Value", 0.4);
        const leftOptionEnabled = boolean("Left Option Enabled", true);
        const rightOptionEnabled = boolean("Right Option Enabled", false);
        const leftOptionText = text("Left Option Text", "Add");
        const rightOptionText = text("Right Option Text", "Add");
        const leftOptionTextColor = color("Left Option Text Color", "#ffffff");
        const rightOptionTextColor = color("Right Option Text Color", "#ffffff");
        const possibleIcons = {
            Unset: undefined,
            Id: "id",
            Add: "add",
            Alarm: "alarm",
            Bell: "bell"
        };
        const leftOptionIcon = select("Left Option Icon", possibleIcons, "add");
        const rightOptionIcon = select("Right Option Icon", possibleIcons, "add");
        const leftOptionIconColor = color("Left Option Icon Color", "#ffffff");
        const rightOptionIconColor = color("Right Option Icon Color", "#ffffff");
        const leftOptionIconHeight = number("Left Option Icon Height", 32);
        const rightOptionIconHeight = number("Right Option Icon Height", 32);
        const leftOptionIconStrokeWidth = number("Left Option Icon Stroke Width", 1);
        const rightOptionIconStrokeWidth = number("Right Option Icon Stroke Width", 1);

        return (
            <View>
                <ContainerSwipeableHorizontal
                    triggerActionThreshold={triggerActionThreshold}
                    leftOptionEnabled={leftOptionEnabled}
                    rightOptionEnabled={rightOptionEnabled}
                    onLeftOptionTrigger={() => alert("swiped left to right")}
                    onRightOptionTrigger={() => alert("swiped right to left")}
                    leftOptionGradientColors={["#ff0000", "#ffffff"]}
                    rightOptionGradientColors={["#ff0000", "#ffffff"]}
                    leftOptionText={leftOptionText}
                    rightOptionText={rightOptionText}
                    leftOptionTextColor={leftOptionTextColor}
                    rightOptionTextColor={rightOptionTextColor}
                    leftOptionIcon={leftOptionIcon}
                    rightOptionIcon={rightOptionIcon}
                    leftOptionIconColor={leftOptionIconColor}
                    rightOptionIconColor={rightOptionIconColor}
                    leftOptionIconHeight={leftOptionIconHeight}
                    rightOptionIconHeight={rightOptionIconHeight}
                    leftOptionIconStrokeWidth={leftOptionIconStrokeWidth}
                    rightOptionIconStrokeWidth={rightOptionIconStrokeWidth}
                >
                    <View style={styles.containerFiller} />
                </ContainerSwipeableHorizontal>
            </View>
        );
    });

const styles = StyleSheet.create({
    containerFiller: {
        backgroundColor: "blue",
        height: 60
    }
});
