import React, { PureComponent } from "react";
import { Animated, Dimensions, Image, Modal, StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import {
    GestureHandlerRootView,
    PanGestureHandler,
    PinchGestureHandler,
    State,
    TapGestureHandler
} from "react-native-gesture-handler";
import { isTabletSize } from "ripe-commons-native";

import { ButtonIcon } from "../button-icon";
import { Touchable } from "../touchable";

export class Lightbox extends PureComponent {
    static get propTypes() {
        return {
            uri: PropTypes.string,
            src: PropTypes.string,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            borderRadius: PropTypes.number,
            maxZoomScale: PropTypes.number,
            minZoomScale: PropTypes.number,
            zoomAnimationDuration: PropTypes.number,
            translateAnimationDuration: PropTypes.number,
            resizeMode: PropTypes.string,
            resizeModeFullScreen: PropTypes.string,
            closeButton: PropTypes.bool,
            visible: PropTypes.bool,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            uri: undefined,
            src: undefined,
            width: "100%",
            height: "100%",
            zoomAnimationDuration: 200,
            translateAnimationDuration: 200,
            maxZoomScale: 3,
            minZoomScale: 1,
            borderRadius: undefined,
            resizeMode: undefined,
            resizeModeFullScreen: "contain",
            closeButton: true,
            visible: false,
            onVisible: () => {},
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;

        this.fullZoomedInValue = this.props.maxZoomScale;
        this.fullZoomedOutValue = 1;

        this.translatedX = 0;
        this.translatedXTreshold = 0;
        this.translatedY = 0;
        this.translatedYTreshold = 0;

        this.translateX = new Animated.Value(0);
        this.translateY = new Animated.Value(0);
        this.baseScale = new Animated.Value(1);
        this.scaleRate = new Animated.Value(1);
        this.scale = Animated.multiply(this.baseScale, this.scaleRate);
        this.lastScale = 1;

        this.state = {
            zoomed: false,
            zooming: false,
            visible: this.props.visible
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

    closeLigthBox() {
        this.setVisibility(false);
        this.reset();
    }

    reset() {
        this.setState({ zoomed: false });
        this.scaleRate.setValue(1);
        this.baseScale.setValue(1);
        this.translateX.setValue(0);
        this.translateY.setValue(0);
    }

    resetTranslation = () => {
        Animated.parallel([
            Animated.timing(this.translateX, {
                toValue: 0,
                duration: this.props.zoomAnimationDuration,
                useNativeDriver: true
            }),
            Animated.timing(this.translateY, {
                toValue: 0,
                duration: this.props.zoomAnimationDuration,
                useNativeDriver: true
            })
        ]).start(() => {
            this.translatedX = 0;
            this.translatedY = 0;
        });
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
        if (this.scale._value === 1 || !this.state.zoomed) return;

        const dx = event.nativeEvent.translationX + this.translatedX;
        const dy = event.nativeEvent.translationY + this.translatedY;

        if (Math.abs(dx) < this.translatedXTreshold) {
            this.translateX.setValue(dx);
        }
        if (Math.abs(dy) < this.translatedYTreshold) {
            this.translateY.setValue(dy);
        }
    };

    onPanGestureEnd = event => {
        if (event.nativeEvent.state !== State.END) return;

        this.translatedX = this.translateX._value;
        this.translatedY = this.translateY._value;
    };

    onPinchGesture = event => {
        const pinchScale = event.nativeEvent.scale;
        const scale = this.baseScale._value * pinchScale;
        if (scale < this.props.minZoomScale || scale > this.props.maxZoomScale) return;

        this.scaleRate.setValue(pinchScale);
        this.lastScale = scale;
        this.setState({ zoomed: true });
    };

    onPinchGestureEnd = event => {
        if (event.nativeEvent.oldState !== State.ACTIVE) return;

        // as the pinch is always centered we reset translation
        // as housekeeping
        this.resetTranslation();

        this.baseScale.setValue(this.lastScale);
        this.scaleRate.setValue(1);
        this._setTranslateTresholds(this.lastScale);
    };

    onDoubleTap = event => {
        if (event.nativeEvent.state !== State.ACTIVE) return;

        if (!this.state.zoomed) {
            this._doubleTapZoomIn(event.nativeEvent);
        } else {
            this._doubleTapZoomOut();
        }
    };

    _doubleTapZoomIn = event => {
        this._setTranslateTresholds(this.fullZoomedInValue);
        const translateX = this._getDoubleTapZoomInTranslateX(event);
        const translateY = this._getDoubleTapZoomInTranslateY(event);

        this.translatedX = translateX;
        this.translatedY = translateY;

        this.setState({ zooming: true }, () => {
            Animated.parallel([
                Animated.timing(this.scaleRate, {
                    toValue: this.fullZoomedInValue,
                    duration: this.props.zoomAnimationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.translateX, {
                    toValue: translateX,
                    duration: this.props.translateAnimationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.translateY, {
                    toValue: translateY,
                    duration: this.props.translateAnimationDuration,
                    useNativeDriver: true
                })
            ]).start(() => {
                const scaleRatio = this.baseScale._value * this.fullZoomedInValue;
                this.lastScale = scaleRatio;
                this.baseScale.setValue(this.lastScale);
                this.scaleRate.setValue(1);
                this.setState({ zooming: false, zoomed: true });
            });
        });
    };

    _doubleTapZoomOut = () => {
        this.setState({ zooming: true }, () => {
            Animated.parallel([
                Animated.timing(this.scaleRate, {
                    toValue: this.fullZoomedOutValue,
                    duration: this.props.zoomAnimationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.baseScale, {
                    toValue: 1,
                    duration: this.props.zoomAnimationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.translateX, {
                    toValue: 0,
                    duration: this.props.zoomAnimationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.translateY, {
                    toValue: 0,
                    duration: this.props.zoomAnimationDuration,
                    useNativeDriver: true
                })
            ]).start(() => {
                this.lastScale = 1;
                this.baseScale.setValue(this.lastScale);
                this.setState({ zooming: false, zoomed: false });
            });
        });
    };

    _imageSource = () => {
        return this.props.uri ? { uri: this.props.uri } : this.props.src;
    };

    /**
     * Gets the Y coordinate to zoom in to when double tapping
     * the image. It takes into account the threshold so that the
     * image does not move outside its limits.
     *
     * @param {Object} event The double tap event.
     */

    _getDoubleTapZoomInTranslateY = event => {
        const y = event.y;
        const middleY = this.screenHeight / 2;
        const touchMiddleDistance = middleY - y;
        const translateY = Math.min(this.translatedYTreshold, Math.abs(touchMiddleDistance));
        return y > middleY ? -1 * translateY : translateY;
    };

    /**
     * Gets the X coordinate to zoom in to when double tapping
     * the image. It takes into account the threshold so that the
     * image does not move outside its limits.
     *
     * @param {Object} event The double tap event.
     */
    _getDoubleTapZoomInTranslateX = event => {
        const x = event.x;
        const middleX = this.screenWidth / 2;
        const touchMiddleDistance = x - middleX;
        const translateX = Math.min(this.translatedXTreshold, Math.abs(touchMiddleDistance));
        return x > middleX ? -1 * translateX : translateX;
    };

    /**
     * Determines how much space is available after translation
     * until it reaches the end of the scaled image.
     *
     * @param {Number} scale Current scale value of the image.
     */
    _setTranslateTresholds = scale => {
        const scaledHeight = this.screenHeight * scale;
        const scaledWidth = this.screenWidth * scale;

        const scaleDivisor = scale * 2;
        this.translatedXTreshold = (scaledWidth - this.screenWidth) / scaleDivisor;
        this.translatedYTreshold = (scaledHeight - this.screenHeight) / scaleDivisor;
    };

    _imageStyle = () => {
        return [
            {
                width: this.props.width,
                height: this.props.height,
                borderRadius: this.props.borderRadius,
                resizeMode: this.props.resizeMode
            },
            this.props.style
        ];
    };

    _imageFullscreenStyle = () => {
        return [
            styles.imageFullscreen,
            {
                resizeMode: this.props.resizeModeFullScreen,
                transform: [
                    { scale: this.scale },
                    { translateX: this.translateX },
                    { translateY: this.translateY }
                ]
            }
        ];
    };

    render() {
        return (
            <View>
                <Touchable onPress={this.onLightboxPress} activeOpacity={0.7}>
                    <Image style={this._imageStyle()} source={this._imageSource()} />
                </Touchable>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={this.onBackButtonPress}
                >
                    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
                        <Animated.View style={styles.fullscreenContainer}>
                            <PanGestureHandler
                                minPointers={1}
                                maxPointers={1}
                                onHandlerStateChange={this.onPanGestureEnd}
                                onGestureEvent={this.onPanGesture}
                            >
                                <TapGestureHandler
                                    onHandlerStateChange={this.onDoubleTap}
                                    numberOfTaps={2}
                                >
                                    <PinchGestureHandler
                                        onGestureEvent={this.onPinchGesture}
                                        onHandlerStateChange={this.onPinchGestureEnd}
                                    >
                                        <Animated.Image
                                            resizeMode={this.props.resizeModeFullScreen}
                                            style={this._imageFullscreenStyle()}
                                            source={this._imageSource()}
                                        />
                                    </PinchGestureHandler>
                                </TapGestureHandler>
                            </PanGestureHandler>
                            {this.props.closeButton && (
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
                            )}
                        </Animated.View>
                    </GestureHandlerRootView>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageFullscreen: {
        flex: 1,
        width: "100%"
    },
    gestureHandlerRootView: {
        width: "100%",
        height: "100%"
    },
    fullscreenContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#000000",
        justifyContent: "center"
    },
    buttonClose: {
        position: "absolute",
        top: "6%",
        left: "4%"
    }
});

export default Lightbox;
