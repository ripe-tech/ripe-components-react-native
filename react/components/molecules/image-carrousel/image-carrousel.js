import React, { PureComponent } from "react";
import { Alert, Dimensions, Image, Modal, PanResponder, ScrollView, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { isTabletSize } from "../../../util";

import { ButtonIcon, Touchable } from "../../atoms";

export class ImageCarrousel extends PureComponent {
    static get propTypes() {
        return {
            selectedImage: PropTypes.number,
            borderRadius: PropTypes.number,
            resizeModeFullScreen: PropTypes.string,
            images: PropTypes.array,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            uri: undefined,
            src: undefined,
            selectedImage: 0,
            borderRadius: undefined,
            resizeModeFullScreen: undefined,
            images: [],
            onVisible: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.scrollCoeficient = Dimensions.get("window").width;

        this.state = {
            visible: false,
            currentPagePositionPosition: this.props.selectedImage * this.scrollCoeficient,
            selectedImageData: this.props.selectedImage
        };
    }

    setVisibility(value) {
        this.setState(
            {
                visible: value
            },
            this.props.onVisible(value)
        );
    }

    open(imageIndex = 0) {
        if (imageIndex === this.state.selectedImageData) {
            this.setVisibility(true);
            return;
        }
        const currentPagePosition = imageIndex * Dimensions.get("window").width;
        this.setState({currentPagePosition: currentPagePosition, selectedImageData: imageIndex}, () => {
            this.setVisibility(true);
        })
        
    }

    closeLigthBox() {
        this.setVisibility(false);
    }

    onScroll = event => {
        const scroll = event.nativeEvent.contentOffset.x;

        const currentPage = Math.round(scroll / this.scrollCoeficient); 
        this.setState({selectedImageData: currentPage})
    };

    onBackButtonPress = () => {
        this.closeLigthBox();
    };

    onClosePress = () => {
        this.closeLigthBox();
    };

    onLightboxPress = () => {
        this.setVisibility(true);
    };

    _imageSource = (image) => {
        return image.uri ? { uri: image.uri } : image.src;
    };

    _imageFullscreenStyle = (image) => {
        return [
            styles.imageFullscreen,
            {
                resizeMode: this.props.resizeModeFullScreen,
                width: this.scrollCoeficient
            },
            image?.style
        ];
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={this.onBackButtonPress}
                >
                    <View style={styles.fullscreenContainer}>
                        <ScrollView
                            contentOffset={{x: this.state.currentPagePosition, y: 0}}
                            style={{ flex: 1}}
                            contentContainerStyle={{ flexGrow: 1}}
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={true}
                            onScroll={this.onScroll}
                        >
                            {this.props.images.map((image, index) => (
                                <Image
                                    key={index}
                                    style={this._imageFullscreenStyle(image)}
                                    source={this._imageSource(image)}
                                /> 
                            ))}
                        </ScrollView>
                        <ButtonIcon
                            icon={"close"}
                            onPress={this.onClosePress}
                            style={styles.buttonClose}
                            iconStrokeWidth={2}
                            size={isTabletSize() ? 52 : 34}
                            iconHeight={isTabletSize() ? 34 : 22}
                            iconWidth={isTabletSize() ? 34 : 22}
                            backgroundColor={"#000000"}
                            iconStrokeColor={"#ffffff"}
                        />
                        <Text style={styles.title}>
                            {`${this.state.selectedImageData + 1} / ${this.props.images.length}`}
                        </Text>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageFullscreen: {
        borderWidth: 1,
        resizeMode: "contain"
    },
    fullscreenContainer: {
        flex: 1,
        backgroundColor: "#000000"
    },
    buttonClose: {
        position: "absolute",
        top: "6%",
        left: "4%"
    },
    title: {
        fontSize: 13,
        color: "#ffffff",
        position: "absolute",
        bottom: "5%",
        left: "48%"
    }
});

export default ImageCarrousel;
