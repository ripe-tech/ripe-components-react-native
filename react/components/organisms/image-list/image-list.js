import React, { PureComponent } from "react";
import { StyleSheet, Dimensions, ViewPropTypes, LayoutAnimation, View } from "react-native";
import PropTypes from "prop-types";

import { pickImage } from "../../../util";

import { ImageListItem } from "./image-list-item";
import { ImageListItemAdd } from "./image-list-item-add";

export class ImageList extends PureComponent {
    static get propTypes() {
        return {
            images: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string.isRequired })),
            enableAdd: PropTypes.bool,
            enableRemove: PropTypes.bool,
            onAddImage: PropTypes.func,
            onRemoveImage: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            images: [],
            enableAdd: true,
            enableRemove: true,
            onAddImage: () => {},
            onRemoveImage: () => {},
            style: {}
        };
    }

    static _differentImages(one, other) {
        if (one.length !== other.length) return true;

        for (let index = 0; index < one.length; index++) {
            if (one[index].uri !== other[index].uri) {
                return true;
            }
        }

        return false;
    }

    constructor(props) {
        super(props);

        this.state = { images: props.images };
        this.itemsPerRow = Math.floor(Dimensions.get("window").width / 92);
    }

    componentDidUpdate(prevProps, prevState) {
        if (ImageList._differentImages(this.props.images, prevProps.images)) {
            this.setState({ images: this.props.images });
        }
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

    _onPressAdd = async (animate = false) => {
        const image = await pickImage();

        if (image) {
            if (animate) LayoutAnimation.easeInEaseOut();

            this.setState(
                state => ({ images: [...state.images, image] }),
                () => this.props.onAddImage(image)
            );
        }
    };

    _onPressRemove = (index, animate = true) => {
        if (animate) LayoutAnimation.easeInEaseOut();

        this.setState(state => {
            const image = state.images[index];
            const images = [...state.images];
            images.splice(index, 1);

            this.props.onRemoveImage(image, index);
            return { images };
        });
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
                        onPress={() => this._onPressAdd()}
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
