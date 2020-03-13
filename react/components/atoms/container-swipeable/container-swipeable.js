import React, { PureComponent } from "react";
import {
    ViewPropTypes,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Animated,
    Easing,
    StatusBar,
    Platform,
    PanResponder
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

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
            snapThreshold: PropTypes.number,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 1000,
            fullscreen: false,
            doFullscreenSnap: false,
            header: undefined,
            snapThreshold: 0.5,
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
        return this.props.fullscreen ? screenHeight : this.containerPosY;
    };

    open() {
        if (this.animating) return;

        this.animating = true;

        this.setState({ visible: true }, () => {
            this.props.onVisible(true);

            Animated.parallel([
                Animated.timing(this.state.contentHeight, {
                    toValue: 1,
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
    };

    onPanResponderMove = (_evt, gestureState) => {
        if (gestureState.dy === 0) return;
        const gestureStateDistanceY = gestureState.dy > 0 ? gestureState.dy : gestureState.dy * 2;

        // @TODO: Find place to put this code after layout
        this.maxHeightValue = (this.maxHeight() - this.headerHeight) / (this.containerHeight - this.headerHeight);

        // Calculate heightValue
        const heightMoveValue = -(gestureStateDistanceY / this.maxHeight());
        this.heightValue = this.initialContentHeight + heightMoveValue;

        if (this.heightValue <= 0) this.heightValue = 0;
        else if (this.heightValue >= this.maxHeightValue) this.heightValue = this.maxHeightValue;

        this.state.contentHeight.setValue(this.heightValue);
    };

    onPanResponderRelease = (_evt, gestureState) => {
        const snapFullscreenValue = this.maxHeightValue - this.props.snapThreshold;

        if (this.props.doFullscreenSnap && this.heightValue > snapFullscreenValue) {
            this.animating = true;

            Animated.spring(this.state.contentHeight, {
                toValue: this.maxHeightValue,
                duration: this.props.animationsDuration
            }).start(() => {
                this.animating = false;
            });
            return;
        }

        if (this.heightValue > 1) this.open();
        else if (this.heightValue <= this.props.snapThreshold) this.close();
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
        if (!this.isLoaded()) return { opacity: 0 };

        return {
            height: this.state.contentHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [this.headerHeight, this.containerHeight]
            }),
            maxHeight: this.maxHeight()
        };
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
                    // The "contentContainer" style needs to always be applied for the correct height to be applied
                    style={[styles.contentContainer, this._containerStyle()]}
                    onLayout={event => this._onContainerLayout(event)}
                    {...this.panResponder.panHandlers}
                >
                    <TouchableOpacity
                        onLayout={event => this._onHeaderLayout(event)}
                        activeOpacity={1}
                        onPress={this.onHeaderPress}
                    >
                        <View style={styles.knob} />
                        {this.props.header}
                    </TouchableOpacity>
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
