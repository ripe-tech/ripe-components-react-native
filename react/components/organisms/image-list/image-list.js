import React, { PureComponent } from "react";
import { StyleSheet, Dimensions, ViewPropTypes, LayoutAnimation, View } from "react-native";
import PropTypes from "prop-types";

import { pickImage } from "../../../util";

import { ImageListItem } from "./image-list-item";
import { ImageListItemAdd } from "./image-list-item-add";

export class ImageList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { images: [] };
        this.itemsPerRow = Math.floor(Dimensions.get("window").width / 92);
    }

    static get propTypes() {
        return {
            enableAdd: PropTypes.bool,
            enableRemove: PropTypes.bool,
            onAddImage: PropTypes.func,
            onRemoveImage: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            enableAdd: true,
            enableRemove: true,
            onAddImage: () => {},
            onRemoveImage: () => {},
            style: {}
        };
    }

    setImages(images) {
        this.setState({ images: images });
    }

    _addFillers() {
        const imagesLength = this.state.images.length + (this.props.enableAdd ? 1 : 0);
        const neededFillers = this.itemsPerRow - (imagesLength % this.itemsPerRow);

        const fillers = [];
        for (let index = 0; index < neededFillers; index++) {
            fillers.push(<View style={styles.filler} key={`${index}`} />);
        }

        return fillers;
    }

    _onPressRemove = index => {
        LayoutAnimation.easeInEaseOut();

        this.setState(state => {
            const image = state.images[index];
            const images = [...state.images];
            images.splice(index, 1);

            this.props.onRemoveImage(image);
            return { images };
        });
    };

    _onPressAdd = async () => {
        const image = await pickImage();

        if (image) {
            LayoutAnimation.easeInEaseOut();

            this.setState(
                state => ({ images: [...state.images, image] }),
                () => this.props.onAddImage(image)
            );
        }
    };

    _style() {
        return [styles.selectorImage, this.props.style];
    }

    render() {
        return (
            <View style={this._style()}>
                {this.props.enableAdd ? (
                    <ImageListItemAdd
                        borderColor={"#e4e8f0"}
                        size={80}
                        icon={"plus"}
                        iconColor={"#a4adb5"}
                        iconStrokeWidth={2}
                        iconHeight={26}
                        iconWidth={26}
                        text={"Add photo"}
                        onPress={this._onPressAdd}
                        style={styles.buttonAdd}
                    />
                ) : null}
                {this.state.images.map((image, index) => (
                    <ImageListItem
                        size={80}
                        key={image.uri}
                        index={index}
                        image={image}
                        showIcon={this.props.enableRemove}
                        onIconPress={() => this._onPressRemove(index)}
                        style={styles.itemImage}
                    />
                ))}
                {this._addFillers()}
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
