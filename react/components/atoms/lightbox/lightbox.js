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

        this.baseScale = new Animated.Value(1);
        this.scaleRate = new Animated.Value(1);
        this.lastScale = 1;

        this.state = {
            zoomed: false,
            zooming: false,
            visible: this.props.visible,
            scale: Animated.multiply(this.baseScale, this.scaleRate),
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0)
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
        this.state.translateX.setValue(0);
        this.state.translateY.setValue(0);
        this.state.containerBackgroundColor.setValue(0);
    }

    resetTranslation = () => {
        Animated.parallel([
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
        if (this.state.scale._value === 1 || !this.state.zoomed) return;

        const dx = event.nativeEvent.translationX + this.translatedX;
        const dy = event.nativeEvent.translationY + this.translatedY;

        if (Math.abs(dx) < this.translatedXTreshold) {
            this.state.translateX.setValue(dx);
        }
        if (Math.abs(dy) < this.translatedYTreshold) {
            this.state.translateY.setValue(dy);
        }
    };

    onPanGestureEnd = event => {
        if (event.nativeEvent.state !== State.END) return;

        this.translatedX = this.state.translateX._value;
        this.translatedY = this.state.translateY._value;
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
     * gets the Y coordinate to zoom in to.
     *
     * @param {Object} event The double tap event
     */
    _getDoubleTapZoomInTranslateY = event => {
        const y = event.y;
        const middle = this.screenHeight / this.fullZoomedInValue;
        const touchMiddleDistance = middle - y;

        // if the distance of the coordinate is greater than the translate treshold
        // then assume the treshold value as the X coordinate to zoom in to
        const translateY = Math.min(this.translatedYTreshold, Math.abs(touchMiddleDistance));
        return y > middle ? -1 * translateY : translateY;
    };

    /**
     * gets the X coordinate to zoom in to.
     *
     * @param {Object} event The double tap event
     */
    _getDoubleTapZoomInTranslateX = event => {
        const x = event.x;
        const middle = this.screenWidth / this.fullZoomedInValue;
        const touchMiddleDistance = x - middle;

        // if the distance of the coordinate is greater than the translate treshold
        // then assume the treshold value as the X coordinate to zoom in to
        const translateX = Math.min(this.translatedXTreshold, Math.abs(touchMiddleDistance));
        return x > middle ? -1 * translateX : translateX;
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
                width: "100%",
                resizeMode: this.props.resizeModeFullScreen,
                transform: [
                    { scale: this.state.scale },
                    { translateX: this.state.translateX },
                    { translateY: this.state.translateY }
                ]
            }
        ];
    };

    /**
     * determines how much space is available after translation
     * until reach the end of the scaled "image".
     *
     * @param {Float} scale Current scale value of the image
     */
    _setTranslateTresholds = scale => {
        const scaledHeight = this.screenHeight * scale;
        const scaledWidth = this.screenWidth * scale;

        const scaleDivisor = scale * 2;
        this.translatedXTreshold = (scaledWidth - this.screenWidth) / scaleDivisor;
        this.translatedYTreshold = (scaledHeight - this.screenHeight) / scaleDivisor;
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
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageFullscreen: {
        flex: 1
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
