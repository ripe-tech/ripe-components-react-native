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
    Platform
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

let screenHeight = Dimensions.get("screen").height - initialWindowSafeAreaInsets.top;
if(Platform.OS === "android") screenHeight -= StatusBar.currentHeight;

export class ContainerSwipeable extends PureComponent {
    static get propTypes() {
        return {
            animationsDuration: PropTypes.number,
            fullscreen: PropTypes.bool,
            header: PropTypes.element,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 300,
            fullscreen: false,
            header: undefined,
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
            overlayOpacityAnimationValue: new Animated.Value(0),
            contentHeightAnimationValue: new Animated.Value(0)
        };

        this.headerHeight = 0;
        this.containerHeight = 0;
        this.containerPosY = 0;
        this.animating = false;
    }

    isLoaded = () => {
        return this.state.containerHeightLoaded && this.state.headerHeightLoaded;
    };

    overlayVisible = () => {
        return this.isLoaded() && this.state.visible;
    };

    open() {
        if (this.animating) return;
        this.setState({ visible: true }, () => {
            this.props.onVisible(true);
            this.startOpenAnimation();
        });
    }

    close() {
        if (this.animating) return;
        this.startCloseAnimation(() =>
            this.setState({ visible: false }, this.props.onVisible(false))
        );
    }

    toggle() {
        if (this.state.visible) this.close();
        else this.open();
    }

    startOpenAnimation() {
        this.animating = true;

        Animated.parallel([
            Animated.timing(this.state.contentHeightAnimationValue, {
                toValue: 1,
                duration: this.props.animationsDuration,
                easing: Easing.inOut(Easing.ease)
            }),
            Animated.timing(this.state.overlayOpacityAnimationValue, {
                toValue: 0.5,
                duration: this.props.animationsDuration,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease)
            })
        ]).start(() => {
            this.animating = false;
        });
    }

    startCloseAnimation(callback) {
        this.animating = true;

        Animated.parallel([
            Animated.timing(this.state.contentHeightAnimationValue, {
                toValue: 0,
                duration: this.props.animationsDuration,
                easing: Easing.inOut(Easing.ease)
            }),
            Animated.timing(this.state.overlayOpacityAnimationValue, {
                toValue: 0,
                duration: this.props.animationsDuration,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease)
            })
        ]).start(() => {
            callback();
            this.animating = false;
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
    //TODO check if overlay still works
    _overlayStyle = () => {
        return [
            styles.overlay,
            {
                position: this.props.fullscreen ? undefined : "absolute",
                opacity: this.state.overlayOpacityAnimationValue
            }
        ];
    };

    _containerStyle = () => {
        if (!this.isLoaded()) return { opacity: 0 };

        return {
            height: this.state.contentHeightAnimationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.headerHeight, this.containerHeight] // TODO: move maxHeight here, with logic
            }),
            maxHeight: this.props.fullscreen ? screenHeight : this.containerPosY
        };
    };

    _container = () => {
        return (
            <>
                {this.overlayVisible() && (
                    <Animated.View
                        style={this._overlayStyle()}
                        onStartShouldSetResponder={evt => true}
                        onResponderRelease={this.onOverlayPress}
                    />
                )}
                <Animated.View
                    style={[styles.contentContainer, this._containerStyle()]}
                    onLayout={event => this._onContainerLayout(event)}
                >
                    <TouchableOpacity
                        onLayout={event => this._onHeaderLayout(event)}
                        activeOpacity={1}
                        onPress={this.onHeaderPress}
                    >
                        <View style={styles.knob} />
                        <View>{this.props.header}</View>
                    </TouchableOpacity>
                    <View>{this.props.children}</View>
                    <View style={styles.safeAreaBottom} />
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
        bottom: 0,
        backgroundColor: "#aaffff"
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
