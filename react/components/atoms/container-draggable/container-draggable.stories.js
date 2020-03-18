import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";
import { Button, View, StyleSheet } from "react-native";

import { ContainerDraggable } from "./container-draggable";

import { Text } from "../..";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container Draggable", () => {
        const ref = React.createRef();
        const fullscreen = boolean("Fullscreen", false);
        const doFullscreenSnap = boolean("Fullscreen Snap", false);
        const customHeader = (
            <View style={{ height: 30, backgroundColor: "#ffaaaa" }}>
                <Text>I'm a custom header, press me</Text>
            </View>
        );
        const snapFullscreenThreshold = number("Snap Fullscreen Threshold", 0.9);
        const snapHideThreshold = number("Snap Hide Threshold", 0.5);

        return (
            <View>
                <Button
                    title="Toggle Container"
                    onPress={() => {
                        ref.current.toggle();
                    }}
                />
                <View style={styles.otherContent}>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    </Text>
                </View>
                <ContainerDraggable
                    fullscreen={fullscreen}
                    doFullscreenSnap={doFullscreenSnap}
                    header={customHeader}
                    snapFullscreenThreshold={snapFullscreenThreshold}
                    snapHideThreshold={snapHideThreshold}
                    ref={ref}
                >
                    <Text style={styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ContainerDraggable>
            </View>
        );
    });

const styles = StyleSheet.create({
    otherContent: {
        backgroundColor: "#ff00ff"
    },
    content: {
        backgroundColor: "#aaffff"
    }
});
