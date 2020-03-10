import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Button, View, StyleSheet } from "react-native";

import { ContainerSwipeableHorizontal } from "../..";

storiesOf("Atoms", module).add("Container Swipeable Horizontal", () => {
    return (
        <View>
            <ContainerSwipeableHorizontal
                // triggerActionThreshold={0.7}
                swipeLeft={true}
                swipeLeftIcon={"add"}
                swipeLeftIconColor={"red"}
                swipeLeftText={"add asd asd asd asd asd "}
                swipeLeftGradientColors={["red", "gray", "blue"]}
                onSwipeLeft={() => null}
            >
                <View style={{ backgroundColor: "red", height: 60, opacity: 0.4 }} />
            </ContainerSwipeableHorizontal>
            {/* <ContainerSwipeableHorizontal>
                <View style={{ backgroundColor: "blue", height: 60 }} />
            </ContainerSwipeableHorizontal>
            <ContainerSwipeableHorizontal>
                <View style={{ backgroundColor: "green", height: 60 }} />
            </ContainerSwipeableHorizontal> */}
        </View>
    );
});

const styles = StyleSheet.create({
    text: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        lineHeight: 24
    }
});
