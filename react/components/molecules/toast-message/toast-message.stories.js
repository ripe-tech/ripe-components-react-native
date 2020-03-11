import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { ToastMessage } from "./toast-message";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Toast Message", () => {
        const ref = React.createRef();
        const _text = text("Text", "Marked as read. lala qwqwd qwdqwdqwd wqdqwdqwd qwdqwdqw ");
        const linkText = text("Link Text", "Go back");
        const link = text("Link", "http://www.platforme.com");
        return (
            <View style={styles.root}>
                <Button title="Toggle" onPress={() => ref.current.show()} />
                <ToastMessage text={_text} linkText={linkText} link={link} ref={ref} />
            </View>
        );
    });

const styles = StyleSheet.create({
    root: {
        backgroundColor: "white",
        height: "100%",
        flex: 1
    }
});
