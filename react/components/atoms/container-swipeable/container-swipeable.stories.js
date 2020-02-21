import React from "react";
import { storiesOf } from "@storybook/react-native";
import { Button, View } from "react-native";

import { ContainerSwipeable } from "../";

storiesOf("Atoms", module).add("Container Swipeable", () => {
    this.containerSwipleableRef = null;
    return (
        <View>
            <Button title="Toogle" onPress={() => this.containerSwipleableRef.toogle()} />
            <ContainerSwipeable ref={ref => (this.containerSwipleableRef = ref)}>
                <Button title="Asda" onPress={() => null} />
            </ContainerSwipeable>
        </View>
    );
});
