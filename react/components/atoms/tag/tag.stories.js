import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select, text } from "@storybook/addon-knobs";
import { Tag } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Tag", () => {
        const onKeyPress = () => alert("Yupi you pressed me!");
        const icon = select(
            "Icon",
            { None: null, Add: "add", ArrowLeft: "chevron-left" },
            "chevron-left"
        );
        const iconColor = text("Icon color", "#16425c");
        const textToShow = text("Text", "Some cool text");
        const variant = select("Variant", { Active: "active", Disable: "disable" }, "active");
        return (
            <Tag
                onPress={onKeyPress}
                text={textToShow}
                iconColor={iconColor}
                icon={icon}
                variant={variant}
            />
        );
    });
