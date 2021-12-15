import React, { PureComponent } from "react";
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    View,
    ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

import {
    Directions,
    FlingGestureHandler,
    PanGestureHandler,
    ScrollView,
    State,
    TapGestureHandler
} from "react-native-gesture-handler";

import { isTabletSize } from "ripe-commons-native";
import { ButtonIcon } from "ripe-components-react-native";
export class ImageCarrousel extends PureComponent {
    static get propTypes() {
        return {
            images: PropTypes.array.isRequired,
            selectedImage: PropTypes.number,
            zoomAnimationDuration: PropTypes.number,
            translateAnimationDuration: PropTypes.number,
            resizeModeFullScreen: PropTypes.string,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            selectedImage: 0,
            zoomAnimationDuration: 200,
            translateAnimationDuration: 200,
            resizeModeFullScreen: "contain",
            images: [],
            onVisible: () => {},
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

        this.fullscreenContainerBackgroundColor = 0;
        this.fullscreenContainerBackgroundColorAnimated = 1;
        this.fullscreenContainerTranslateYAnimationValue = 15;
        this.fullscreenContainerBackgroundColorAnimatedDuration = 200;

        this.fullZoomedInValue = 2;
        this.fullZoomedOutValue = 1;

        this.translatedX = 0;
        this.translatedXTreshold = 0;
        this.translatedY = 0;
        this.translatedYTreshold = 0;

        this.imagesOriginalSizes = {};

        this.state = {
            zoomed: false,
            zooming: false,
            visible: false,
            selectedImage: this.props.selectedImage,
            fullscreenContainerBackgroundColor: new Animated.Value(0),
            baseScale: new Animated.Value(1),
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0),
            imagesOriginalSizes: {}
        };
    }

    componentDidMount() {
        this.setupImagesOriginalSizes();
    }

    setVisibility(value) {
        this.setState(
            {
                visible: value
            },
            () => this.props.onVisible(value)
        );
    }

    setupImagesOriginalSizes() {
        const imagesOriginalSizes = {};
        this.props.images.forEach((image, index) => {
            Image.getSize(image.uri, (width, height) => {
                const aspectRatioHeight = this.screenWidth / (width / height);
                imagesOriginalSizes[index] = {
                    width: width,
                    height: height,
                    aspectRatioHeight: aspectRatioHeight
                };
            });
        });
        this.setState({ imagesOriginalSizes: imagesOriginalSizes });
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
        this.reset();
    }

    reset() {
        this.setState({ zoomed: false });
        this.state.baseScale.setValue(1);
        this.state.translateX.setValue(0);
        this.state.translateY.setValue(0);
    }

    onScroll = event => {
        const scroll = event.nativeEvent.contentOffset.x;

        const currentPage = Math.round(scroll / this.screenWidth);
        this.setState({ selectedImage: currentPage });
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

    onPanGesture = event => {
        if (!this.state.zoomed) return;
        const dx = event.nativeEvent.translationX + this.translatedX;
        const dy = event.nativeEvent.translationY + this.translatedY;
        if (Math.abs(dx) < this.translatedXTreshold) {
            this.state.translateX.setValue(dx);
        }

        if (Math.abs(dy) < this.translatedYTreshold) {
            this.state.translateX.setValue(dy);
        }
    };

    onPanGestureEnd = event => {
        if (event.nativeEvent.state === State.END) {
            this.translatedX = this.state.translateX._value;
        }
    };

    onImageDoubleTap = (event, index = null) => {
        const imageindex = index || this.state.selectedImage;
        if (event.nativeEvent.state === State.ACTIVE) {
            if (this.state.zoomed) {
                this._doubleTapZoomOut();
            } else {
                this._doubleTapZoomIn(event.nativeEvent, imageindex);
            }
        }
    };

    _getTranslateX = (event, middle) => {
        const x = event.x;
        this.translatedXTreshold = this.screenWidth / 4;
        const touchMiddleDistance = x - middle;

        const translateX =
            Math.abs(touchMiddleDistance) > this.translatedXTreshold
                ? this.translatedXTreshold
                : touchMiddleDistance;
        return x > middle ? -1 * Math.abs(translateX) : Math.abs(translateX);
    };

    _getTranslateY = (event, middle, imageHeight) => {
        const y = event.y;

        const imageScaledY = imageHeight * 2;
        const touchMiddleDistance = middle - y;
        this.translatedYTreshold =
            imageScaledY > this.screenHeight ? (imageScaledY - this.screenHeight) / 2 : 0;
        const translateY =
            Math.abs(touchMiddleDistance) > this.translatedYTreshold
                ? this.translatedYTreshold
                : touchMiddleDistance;

        return y > middle ? -1 * Math.abs(translateY) : Math.abs(translateY);
    };

    _doubleTapZoomIn = (event, imageIndex) => {
        const imageHeight = this._getAspectRatioHeight(imageIndex);
        const middleX = this.screenWidth / 2;
        const middleY = imageHeight / 2;
        const translateX = this._getTranslateX(event, middleX);
        const translateY = this._getTranslateY(event, middleY, imageHeight);

        this.translatedX = translateX;
        this.translatedY = translateY;

        this.setState({ zooming: true }, () => {
            Animated.parallel([
                Animated.timing(this.state.baseScale, {
                    toValue: this.fullZoomedInValue,
                    duration: this.props.zoomAnimationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.translateX, {
                    toValue: translateX,
                    duration: this.props.translateAnimationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.translateY, {
                    toValue: translateY,
                    duration: this.props.translateAnimationDuration,
                    useNativeDriver: true
                })
            ]).start(() => {
                this.setState({ zooming: false, zoomed: true });
            });
        });
    };

    _doubleTapZoomOut = () => {
        this.setState({ zooming: true }, () => {
            Animated.parallel([
                Animated.timing(this.state.baseScale, {
                    toValue: this.fullZoomedOutValue,
                    duration: this.props.zoomAnimationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.translateX, {
                    toValue: 0,
                    duration: this.props.zoomAnimationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.translateY, {
                    toValue: 0,
                    duration: this.props.zoomAnimationDuration,
                    useNativeDriver: true
                })
            ]).start(() => this.setState({ zooming: false, zoomed: false }));
        });
    };

    onFlingMovement = event => {
        if (this.state.zoomed) return;
        if (event.nativeEvent.state === State.END) {
            Animated.parallel([
                Animated.timing(this.state.translateY, {
                    toValue: this.fullscreenContainerTranslateYAnimationValue,
                    duration: this.fullscreenContainerBackgroundColorAnimatedDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.fullscreenContainerBackgroundColor, {
                    toValue: this.fullscreenContainerBackgroundColorAnimated,
                    duration: this.fullscreenContainerBackgroundColorAnimatedDuration,
                    useNativeDriver: false
                })
            ]).start(() => this.setState({ visible: false }));
        }
    };

    _getAspectRatioHeight = imageIndex => {
        return this.state.imagesOriginalSizes[imageIndex].aspectRatioHeight;
    };

    _imageSource = image => {
        return image?.uri ? image : { uri: image };
    };

    _fullscreenContainerStyle = () => {
        return [
            styles.fullscreenContainer,
            {
                backgroundColor: this.state.fullscreenContainerBackgroundColor.interpolate({
                    inputRange: [
                        this.fullscreenContainerBackgroundColor,
                        this.fullscreenContainerBackgroundColorAnimated
                    ],
                    outputRange: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0.8)"]
                })
            }
        ];
    };

    _imageFullscreenStyle = (image, index) => {
        return [
            styles.imageFullscreen,
            {
                width: this.screenWidth,
                height: this.state.imagesOriginalSizes[index]
                    ? this._getAspectRatioHeight(index)
                    : "100%",
                transform:
                    this.state.selectedImage === index
                        ? [
                              { scale: this.state.baseScale },
                              { translateX: this.state.translateX },
                              { translateY: this.state.translateY }
                          ]
                        : []
            },
            image?.style
        ];
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    activeOpacity={0.3}
                    animationType="fade"
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={this.onBackButtonPress}
                >
                    <FlingGestureHandler
                        direction={Directions.DOWN}
                        onHandlerStateChange={this.onFlingMovement}
                    >
                        <Animated.View style={this._fullscreenContainerStyle()}>
                            <ScrollView
                                scrollEnabled={this.state.zooming || !this.state.zoomed}
                                disableScrollViewPanResponder={this.state.zoomed}
                                contentOffset={{ x: this.state.currentPagePosition, y: 0 }}
                                style={styles.scrollView}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                horizontal={true}
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={true}
                                onScroll={this.onScroll}
                            >
                                {this.props.images.map((image, index) => (
                                    <TapGestureHandler
                                        onHandlerStateChange={event =>
                                            this.onImageDoubleTap(event, index)
                                        }
                                        numberOfTaps={2}
                                    >
                                        <Animated.Image
                                            style={this._imageFullscreenStyle(image, index)}
                                            resizeMode={this.props.resizeModeFullScreen}
                                            source={this._imageSource(image)}
                                        />
                                    </TapGestureHandler>
                                ))}
                            </ScrollView>
                            {this.state.zoomed && (
                                <PanGestureHandler
                                    onHandlerStateChange={this.onPanGestureEnd}
                                    onGestureEvent={this.onPanGesture}
                                >
                                    <TapGestureHandler
                                        onHandlerStateChange={event => this.onImageDoubleTap(event)}
                                        numberOfTaps={2}
                                    >
                                        <View style={styles.panResponderView} />
                                    </TapGestureHandler>
                                </PanGestureHandler>
                            )}
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
                            {this.props.images.length > 1 && (
                                <Text style={styles.title}>
                                    {`${this.state.selectedImage + 1} / ${
                                        this.props.images.length
                                    }`}
                                </Text>
                            )}
                        </Animated.View>
                    </FlingGestureHandler>
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
    fullscreenContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    panResponderView: {
        position: "absolute",
        height: "100%",
        width: "100%"
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
