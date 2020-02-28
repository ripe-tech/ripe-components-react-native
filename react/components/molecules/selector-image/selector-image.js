import React, { PureComponent } from "react";
import { StyleSheet, Dimensions, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";
import ImagePicker from "react-native-image-picker";

import { ButtonGeneric, ItemImage } from "../../";

const { width: DeviceWidth } = Dimensions.get("window");
const columnNumbers = Math.floor(DeviceWidth / 92);

export class SelectorImage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            images: props.images
        };

        this.options = {
            title: "Select Image",
            mediaType: "photo",
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: "images"
            }
        };
    }

    static get propTypes() {
        return {
            onAddImage: PropTypes.func,
            onRemoveImage: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            onAddImage: undefined,
            onPressImage: undefined,
            style: {}
        };
    }

    _addBlankImages() {
        let elementsToReturn = [];
        let imagesLength = this.state.images.length + (this.onAddImage ? 1 : 0);
        const blankImagesNeeded =
            Math.ceil(imagesLength / columnNumbers) * columnNumbers - imagesLength;

        for (let index = 0; index < blankImagesNeeded; index++) {
            elementsToReturn.push(<View style={styles.filler} key={`${index}`} />);
        }

        return elementsToReturn;
    }

    onRemoveImage = imageIndex => {
        this.setState(state => {
            const images = [...state.images];
            images.splice(imageIndex, 1);
            return { images };
        });
    };

    onAddImage = async indexImage => {
        ImagePicker.showImagePicker(this.options, async response => {
            if (response.didCancel) {
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else {
                // const source = { uri: "data:image/jpeg;base64," + response.data }; //BASE64 option
                this.setState(state => {
                    const images = [...state.images, { uri: response.uri }];
                    return {
                        images
                    };
                });
            }
        });
    };

    _styles() {
        return [styles.selectorImage, this.props.style];
    }

    render() {
        return (
            <View style={this._styles()}>
                {this.onAddImage ? (
                    <ButtonGeneric
                        borderColor={"#e4e8f0"}
                        size={80}
                        icon={"plus"}
                        iconColor={"#a4adb5"}
                        iconStrokeWidth={2}
                        iconHeight={26}
                        iconWidth={26}
                        text={"Add photo"}
                        onPress={this.onAddImage}
                        style={styles.buttonAdd}
                    />
                ) : null}
                {this.state.images.map((image, index) => (
                    <ItemImage
                        size={80}
                        key={image.uri}
                        index={index}
                        image={image}
                        onPressImage={this.onRemoveImage}
                        style={styles.itemImage}
                    />
                ))}
                {this._addBlankImages()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    selectorImage: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    buttonAdd: {
        margin: 6
    },
    itemImage: {
        margin: 6
    },
    filler: {
        margin: 6,
        width: 80,
        height: 80
    }
});
