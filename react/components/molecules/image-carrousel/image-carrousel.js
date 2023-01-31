import React, { PureComponent } from "react";
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import { isTabletSize } from "ripe-commons-native";

import { ButtonIcon } from "../../atoms";

export class ImageCarrousel extends PureComponent {
    static get propTypes() {
        return {
            selectedImage: PropTypes.number,
            resizeModeFullScreen: PropTypes.string,
            images: PropTypes.array,
            onVisible: PropTypes.func,
            style: PropTypes.any,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            selectedImage: 0,
            resizeModeFullScreen: undefined,
            images: [],
            onVisible: () => {},
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.screenWidth = Dimensions.get("window").width;

        this.state = {
            visible: false,
            selectedImage: this.props.selectedImage
        };
    }

    setVisibility(value) {
        this.setState(
            {
                visible: value
            },
            () => this.onVisibilityUpdate(value)
        );
    }

    open(imageIndex = 0) {
        if (imageIndex === this.state.selectedImage) {
            this.setVisibility(true);
            return;
        }
        const currentPagePosition = imageIndex * Dimensions.get("window").width;
        this.setState({ currentPagePosition: currentPagePosition, selectedImage: imageIndex }, () =>
            this.setVisibility(true)
        );
    }

    closeLigthBox() {
        this.setVisibility(false);
    }

    onScroll = event => {
        const scroll = event.nativeEvent.contentOffset.x;

        const currentPage = Math.round(scroll / this.screenWidth);
        this.setState({ selectedImage: currentPage });
    };

    onVisibilityUpdate(value) {
        this.props.onVisible(value);
        if (value) {
            this.scrollViewRef.scrollTo({
                x: this.state.currentPagePosition,
                y: 0
            });
        }
    }

    onBackButtonPress = () => {
        this.closeLigthBox();
    };

    onClosePress = () => {
        this.closeLigthBox();
    };

    onLightboxPress = () => {
        this.setVisibility(true);
    };

    _imageSource = image => {
        return image.uri ? { uri: image.uri } : image.src;
    };

    _imageFullscreenStyle = image => {
        return [
            styles.imageFullscreen,
            {
                resizeMode: this.props.resizeModeFullScreen,
                width: this.screenWidth
            },
            image?.style
        ];
    };

    _style() {
        return [styles.container, this.props.style];
    }

    render() {
        return (
            <View style={this._style()}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={this.onBackButtonPress}
                >
                    <View style={styles.fullscreenContainer}>
                        <ScrollView
                            ref={el => (this.scrollViewRef = el)}
                            contentOffset={{ x: this.state.currentPagePosition, y: 0 }}
                            style={styles.scrollView}
                            contentContainerStyle={{ flexGrow: 1 }}
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
                            style={styles.buttonClose}
                            icon={"close"}
                            iconStrokeWidth={2}
                            size={isTabletSize() ? 52 : 34}
                            iconHeight={isTabletSize() ? 34 : 22}
                            iconWidth={isTabletSize() ? 34 : 22}
                            backgroundColor={"#000000"}
                            iconStrokeColor={"#ffffff"}
                            onPress={this.onClosePress}
                        />
                        <Text style={styles.title}>
                            {`${this.state.selectedImage + 1} / ${this.props.images.length}`}
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
    scrollView: {
        flex: 1
    },
    imageFullscreen: {
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
