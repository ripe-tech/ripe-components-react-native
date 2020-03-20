import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";
import { Button, View, StyleSheet, Text } from "react-native";

import { ContainerDraggable } from "./container-draggable";
import { ContainerOpenable } from "../container-openable";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container Draggable", () => {
        const ref = React.createRef();
        const modal = boolean("Modal", false);
        const customHeader = (
            <View style={{ height: 30, backgroundColor: "#ffaaaa" }}>
                <Text>I'm a custom header, press me</Text>
            </View>
        );
        const pressThreshold = number("Press Threshold", 2.5);
        const snapCloseThreshold = number("Snap Close Threshold", 0.4);
        return (
            <View>
                <Button
                    title="Toggle Container"
                    onPress={() => {
                        ref.current.child.toggle();
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
                    pressThreshold={pressThreshold}
                    snapCloseThreshold={snapCloseThreshold}
                    ref={ref}
                >
                    <ContainerOpenable modal={modal} header={customHeader}>
                        <Text style={styles.content}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat non non
                            non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </Text>
                    </ContainerOpenable>
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
