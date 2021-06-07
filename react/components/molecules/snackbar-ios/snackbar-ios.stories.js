import React from "react";
import { Button, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { SnackbarIos } from "./snackbar-ios";

storiesOf("Components/Molecules/Snackbar ios", module)
    .addDecorator(withKnobs)
    .add("SnackbarIos", () => {
        const ref = React.createRef();
        const _text = text("Text", "Marked as read.");
        const actionText = text("Action Text", "Undo");
        const showDuration = number("Show Duration", -1);

        return (
            <View>
                <Button title="Show" onPress={() => ref.current.show()} />
                <Button title="Hide" onPress={() => ref.current.hide()} />
                <SnackbarIos
                    text={_text}
                    actionText={actionText}
                    ref={ref}
                    showDuration={showDuration === -1 ? undefined : showDuration}
                    onActionPress={() => {
                        alert("Action presssed!");
                    }}
                />
            </View>
        );
    });
