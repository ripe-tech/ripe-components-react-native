import React, { PureComponent } from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, select } from "@storybook/addon-knobs";

import { Touchable } from "../../atoms";
import { ImageCarrousel } from "./image-carrousel";

class Wrapper extends PureComponent {
    static get propTypes() {
        return {
            selectedImage: PropTypes.number,
            resizeModeFullScreen: PropTypes.string,
            images: PropTypes.array
        };
    }

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                {this.props.images.map((image, index) => (
                    <Touchable
                        style={{
                            marginLeft: 5
                        }}
                        onPress={() => {
                            this.carrousel.open(index);
                        }}
                        key={index}
                    >
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                borderWidth: 1,
                                marginLeft: 5,
                                borderColor: "red",
                                resizeMode: "contain"
                            }}
                            key={index}
                            source={image}
                        />
                    </Touchable>
                ))}
                <ImageCarrousel
                    ref={ref => (this.carrousel = ref)}
                    selectedImage={this.props.selectedImage}
                    images={this.props.images}
                    resizeModeFullScreen={this.props.resizeModeFullScreen}
                />
            </View>
        );
    }
}

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Image Carroussel", () => {
        const resizeModeFullScreen = select(
            "Resize Mode FullScreen",
            {
                Unset: undefined,
                Cover: "cover",
                Contain: "contain",
                Stretch: "stretch",
                Center: "center"
            },
            "contain"
        );

        const images = [
            { uri: "https://cdn.platforme.com/images/platforme.png" },
            {
                uri: "https://uploads-ssl.webflow.com/6058ae7c564d2124a415d2c8/606b4a322fe7bfcb202a9e79_icon_secondary_blue%201.png"
            },
            { uri: "https://cdn.startbase.com/images/company/f4ntec/809b007a99/" }
        ];

        let selectedImage = 0;

        return (
            <Wrapper
                resizeModeFullScreen={resizeModeFullScreen}
                images={images}
                selectedImage={selectedImage}
            />
        );
    });
