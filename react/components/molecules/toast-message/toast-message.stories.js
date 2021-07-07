import React from "react";
import { Button, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { ToastMessage } from "./toast-message";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Toast Message", () => {
        const ref = React.createRef();
        const _text = text("Text", "Marked as read.");
        const linkText = text("Link Text", "Undo");
        const linkUrl = text("Link URL", "http://www.platforme.com");
        return (
            <View>
                <Button title="Show" onPress={() => ref.current.show()} />
                <Button title="Hide" onPress={() => ref.current.hide()} />
                <ToastMessage text={_text} linkText={linkText} linkUrl={linkUrl} ref={ref} />
            </View>
        );
    });
