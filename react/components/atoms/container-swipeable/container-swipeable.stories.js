import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Button, Text, View } from "react-native";

import { ContainerSwipeable } from "../";

storiesOf("Atoms", module).add("Container Swipeable", () => {
    const ref = React.createRef();
    return (
        <View>
            <Button title="Toggle" onPress={() => ref.current.toggle()} />
            <ContainerSwipeable ref={ref}>
                <Text>Content</Text>
            </ContainerSwipeable>
        </View>
    );
});
