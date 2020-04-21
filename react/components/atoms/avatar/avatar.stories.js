import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number } from "@storybook/addon-knobs";
import { StyleSheet, View } from "react-native";

import { Avatar } from "./avatar";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Avatar", () => {
        const size = number("Size", undefined);
        const activeOpacity = number("Active Opacity", undefined);
        const borderRadius = number("Border Radius", undefined);
        return (
            <View style={styles.container}>
                <Avatar
                    image={{
                        uri: "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar"
                    }}
                    size={size}
                    borderRadius={borderRadius}
                    activeOpacity={activeOpacity}
                    onPress={() => {
                        alert("Nice touch!");
                    }}
                />
            </View>
        );
    });

const styles = StyleSheet.create({
    container: {
        alignSelf: "center"
    }
});
