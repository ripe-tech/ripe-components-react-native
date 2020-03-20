import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Button, View, StyleSheet } from "react-native";

import { ContainerDraggable } from "./container-draggable";

import { Text } from "../..";

storiesOf("Atoms", module).add("Container Draggable", () => {
    const ref = React.createRef();
    return (
        <View>
            <Button title="Toggle" onPress={() => ref.current.toggle()} />
            <ContainerDraggable ref={ref}>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </ContainerDraggable>
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