import React, { PureComponent } from "react";
import {
    ViewPropTypes,
    StyleSheet,
    View,
    Dimensions,
    Animated,
    Easing,
    StatusBar,
    Platform,
    PanResponder,
    Modal
} from "react-native";
import PropTypes from "prop-types";

import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

let screenHeight = Dimensions.get("window").height - initialWindowSafeAreaInsets.top;
if (Platform.OS === "android") screenHeight -= StatusBar.currentHeight;

export class ContainerSwipeable extends PureComponent {
    static get propTypes() {
        return {
            animationsDuration: PropTypes.number,
            fullscreen: PropTypes.bool,
            doFullscreenSnap: PropTypes.bool,
            header: PropTypes.element,
            snapFullscreenThreshold: PropTypes.number,
            snapHideThreshold: PropTypes.number,
            pressThreshold: PropTypes.number,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 300,
            fullscreen: false,
            doFullscreenSnap: false,
            header: undefined,
            snapFullscreenThreshold: 0.8,
            snapHideThreshold: 0.5,
            pressThreshold: 2.5,
            onVisible: visible => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            containerHeightLoaded: false,
            headerHeightLoaded: false,
            visible: false,
            overlayOpacity: new Animated.Value(0),
            contentHeight: new Animated.Value(0)
        };

        this.headerHeight = 0;
        this.containerHeight = 0;
        this.containerPosY = 0;
        this.initialContentHeight = 0;
        this.animating = false;
        this.panMoving = false;

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (_evt, _gestureState) => true,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease
        });
    }

    isLoaded = () => {
        return this.state.containerHeightLoaded && this.state.headerHeightLoaded;
    };

    maxHeight = () => {
        return this.props.fullscreen
            ? screenHeight
            : this.containerPosY - initialWindowSafeAreaInsets.top;
    };

    maxHeightAnimationValue = () => {
        return this.maxHeightValue < 1 ? this.maxHeightValue : 1;
    };

    open() {
        if (this.animating) return;

        this.animating = true;

        this.setState({ visible: true }, () => {
            this.props.onVisible(true);

            Animated.parallel([
                Animated.timing(this.state.contentHeight, {
                    toValue: this.maxHeightAnimationValue(),
                    duration: this.props.animationsDuration,
                    easing: Easing.inOut(Easing.ease)
                }),
                Animated.timing(this.state.overlayOpacity, {
                    toValue: 0.5,
                    duration: this.props.animationsDuration,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease)
                })
            ]).start(() => {
                this.animating = false;
            });
        });
    }

    close() {
        if (this.animating) return;

        this.animating = true;

        Animated.parallel([
            Animated.timing(this.state.contentHeight, {
                toValue: 0,
                duration: this.props.animationsDuration,
                easing: Easing.inOut(Easing.ease)
            }),
            Animated.timing(this.state.overlayOpacity, {
                toValue: 0,
                duration: this.props.animationsDuration,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease)
            })
        ]).start(() => {
            this.animating = false;
            this.setState({ visible: false }, this.props.onVisible(false));
        });
    }

    toggle() {
        if (this.state.visible) this.close();
        else this.open();
    }

    fullscreenSnapOpen() {
        if (this.animating) return;

        this.animating = true;

        this.setState({ visible: true }, () => {
            this.props.onVisible(true);

            Animated.parallel([
                Animated.spring(this.state.contentHeight, {
                    toValue: this.maxHeightAnimationValue(),
                    duration: this.props.animationsDuration
                }),
                Animated.timing(this.state.overlayOpacity, {
                    toValue: 0.5,
                    duration: this.props.animationsDuration,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease)
                })
            ]).start(() => {
                this.animating = false;
            });
        });
    }

    onOverlayPress = () => {
        this.close();
    };

    onModalRequestClose = () => {
        this.close();
    };

    onHeaderPress = () => {
        this.toggle();
    };

    onPanResponderGrant = (_evt, _gestureState) => {
        this.initialContentHeight = this.state.contentHeight._value;
        this.maxHeightValue =
            (this.maxHeight() - this.headerHeight) / (this.containerHeight - this.headerHeight);
    };

    onPanResponderMove = (_evt, gestureState) => {
        if (Math.abs(gestureState.dy) > this.props.pressThreshold) this.panMoving = true;

        const heightMoveValue = -(gestureState.dy / (this.containerHeight - this.headerHeight));

        this.heightValue = this.initialContentHeight + heightMoveValue;

        if (!this.state.visible) this.setState({ visible: true }, this.props.onVisible(true));

        if (this.heightValue <= 0) {
            this.heightValue = 0;
            if (this.state.visible) this.setState({ visible: false }, this.props.onVisible(false));
        } else if (this.heightValue >= this.maxHeightAnimationValue())
            this.heightValue = this.maxHeightAnimationValue();

        this.state.overlayOpacity.setValue(
            (this.heightValue * 0.5) / this.maxHeightAnimationValue()
        );
        this.state.contentHeight.setValue(this.heightValue);
    };

    onPanResponderRelease = (_evt, gestureState) => {
        if (!this.panMoving && Math.abs(gestureState.dy) <= this.props.pressThreshold)
            this.onHeaderPress();

        if (this.panMoving) this.panMoving = false;

        const snapFullscreenValue = this.maxHeightValue * this.props.snapFullscreenThreshold;

        if (this.props.doFullscreenSnap && this.heightValue > snapFullscreenValue) {
            this.fullscreenSnapOpen();
            return;
        }

        if (this.heightValue > 1) this.open();
        else if (this.heightValue <= this.props.snapHideThreshold) this.close();
    };

    _onContainerLayout = event => {
        if (this.state.containerHeightLoaded) return;

        this.containerHeight = event.nativeEvent.layout.height;
        this.containerPosY = event.nativeEvent.layout.y + this.containerHeight;

        this.setState({ containerHeightLoaded: true });
    };

    _onHeaderLayout = event => {
        if (this.state.headerHeightLoaded) return;

        this.headerHeight = event.nativeEvent.layout.height;
        this.setState({ headerHeightLoaded: true });
    };

    _overlayStyle = () => {
        return [
            styles.overlay,
            {
                position: this.props.fullscreen ? undefined : "absolute",
                opacity: this.state.overlayOpacity
            }
        ];
    };

    _containerStyle = () => {
        if (!this.isLoaded()) {
            return [styles.contentContainer, { opacity: 0 }];
        }

        return [
            styles.contentContainer,
            {
                height: this.state.contentHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.headerHeight, this.containerHeight]
                }),
                maxHeight: this.maxHeight()
            }
        ];
    };

    _container = () => {
        return (
            <>
                {this.state.visible && (
                    <Animated.View
                        style={this._overlayStyle()}
                        onStartShouldSetResponder={e => true}
                        onResponderRelease={this.onOverlayPress}
                    />
                )}
                <Animated.View
                    style={this._containerStyle()}
                    onLayout={event => this._onContainerLayout(event)}
                >
                    <View
                        onLayout={event => this._onHeaderLayout(event)}
                        {...this.panResponder.panHandlers}
                    >
                        <View style={styles.knob} />
                        {this.props.header}
                    </View>
                    {this.props.children}
                    {this.props.fullscreen && <View style={styles.safeAreaBottom} />}
                </Animated.View>
            </>
        );
    };

    render() {
        return (
            <>
                {this.props.fullscreen ? (
                    <Modal
                        style={styles.modal}
                        transparent={true}
                        visible={this.state.visible || !this.isLoaded()}
                        onRequestClose={this.onModalRequestClose}
                    >
                        {this._container()}
                    </Modal>
                ) : (
                    this._container()
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: "#000000",
        height: screenHeight,
        width: "100%",
        bottom: 0
    },
    modal: {
        position: "absolute",
        width: "100%",
        margin: 0,
        bottom: 0
    },
    contentContainer: {
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        bottom: 0,
        backgroundColor: "#ffffff"
    },
    knob: {
        alignSelf: "center",
        width: 50,
        height: 5,
        marginVertical: 6,
        borderRadius: 100,
        backgroundColor: "#1a2632",
        opacity: 0.15
    },
    safeAreaBottom: {
        height: initialWindowSafeAreaInsets.bottom
    }
});
