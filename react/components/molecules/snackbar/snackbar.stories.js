import React from "react";
import { Button, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { Snackbar } from "./snackbar";

storiesOf("Components/Molecules/Snackbar", module)
    .addDecorator(withKnobs)
    .add("Snackbar", () => {
        const ref = React.createRef();
        const _text = text("Text", "Marked as read.");
        const actionText = text("Action Text", "Undo");
        const duration = number("Duration", -1);
        const animationDuration = number("Animation Duration", -1);

        return (
            <View>
                <Button title="Show" onPress={() => ref.current.show()} />
                <Button title="Hide" onPress={() => ref.current.hide()} />
                <Snackbar
                    text={_text}
                    actionText={actionText}
                    ref={ref}
                    duration={duration === -1 ? undefined : duration}
                    animationDuration={animationDuration === -1 ? undefined : animationDuration}
                    onActionPress={() => {
                        alert("Action pressed!");
                    }}
                />
            </View>
        );
    });
