import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { Button, View, StyleSheet, Text } from "react-native";

import { ContainerOpenable } from "./container-openable";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container Openable", () => {
        const ref = React.createRef();
        const modal = boolean("Modal", false);
        const customHeader = (
            <View style={{ height: 30, backgroundColor: "#ffaaaa" }}>
                <Text>I'm a custom header, press me</Text>
            </View>
        );
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
                <ContainerOpenable modal={modal} header={customHeader} ref={ref}>
                    <Text style={styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ContainerOpenable>
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
