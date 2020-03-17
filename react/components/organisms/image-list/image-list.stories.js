import React, { PureComponent } from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { ImageList } from "../image-list";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Image List", () => {
        const images = [
            {
                uri:
                    "https://ripe-core-sbx.platforme.com/api/compose?model=vyner&brand=swear&p=front:nappa:white&p=side:nappa:white&p=lining:calf_lining:white&p=laces:nylon:white&p=sole:rubber:white&p=hardware:metal:silver&p=logo:metal:silver&p=shadow:default:default"
            },
            {
                uri:
                    "https://ripe-core-sbx.platforme.com/api/compose?model=aj006&brand=toga_pulla&p=sides:suede_tp:mustard&p=toe:nappa_tp:black&p=buckles:metal_tp:silver&p=straps:suede_tp:mustard&p=lining:calf_lining_tp:beige&p=sole:leather_tp:black&p=shadow:default:default"
            }
        ];

        return <ImageList images={images} />;
    });
