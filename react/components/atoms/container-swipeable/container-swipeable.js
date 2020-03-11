import React, { PureComponent } from "react";
import {
    ViewPropTypes,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Animated,
    Easing
} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("screen").height - initialWindowSafeAreaInsets.top;

export class ContainerSwipeable extends PureComponent {
    static get propTypes() {
        return {
            animationsDuration: PropTypes.number,
            header: PropTypes.element,
            fullscreen: PropTypes.bool,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 500,
            fullscreen: false,
            header: undefined,
            onVisible: visible => { },
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            containerHeightLoaded: false,
            headerHeightLoaded: false,
            visible: false,
            heightAnimationValue: new Animated.Value(0)
        };

        this.headerHeight = 0;
        this.containerHeight = 0;
        this.animating = false;
    }

    isLoaded = () => {
        return this.state.containerHeightLoaded && this.state.headerHeightLoaded;  
    }

    open() {
        if (this.animating) return;
        this.setState({ visible: true }, this.startOpenAnimation());
    }

    close() {
        if (this.animating) return;
        this.startCloseAnimation(() => this.setState({ visible: false }));
    }

    toggle() {
        if(this.state.visible) this.close();
        else this.open();
    }

    startOpenAnimation() {
        this.animating = true;

        Animated.timing(this.state.heightAnimationValue, {
            toValue: 1,
            duration: this.props.animationsDuration,
            easing: Easing.inOut(Easing.ease)
        }).start(() => { this.animating = false });
    }

    startCloseAnimation(callback) {
        this.animating = true;

        Animated.timing(this.state.heightAnimationValue, {
            toValue: 0,
            duration: this.props.animationsDuration,
            easing: Easing.inOut(Easing.ease)
        }).start(() => { callback(); this.animating = false });
    }

    onOverlayPress = () => {
        this.close();
    };

    onModalRequestClose = () => {
        this.close();
    };

    onHeaderPress = () => {
        this.toggle();
    }

    _onContainerLayout = event => {
        if (this.state.containerHeightLoaded) return;

        this.containerHeight = event.nativeEvent.layout.height;
        this.setState({ containerHeightLoaded: true });
    };

    _onHeaderLayout = event => {
        if (this.state.headerHeightLoaded) return;

        this.headerHeight = event.nativeEvent.layout.height;
        this.setState({ headerHeightLoaded: true });
    } 

    _testStyle = () => {
        if (!this.isLoaded()) return { opacity: 0 };

        return {
            height: this.state.heightAnimationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.headerHeight, this.containerHeight]
            })
        };
    };

    _container = () => {
        return (
            <>
                {/*                 {!this.state.initialLoading && ( //TODO fix overlay
                    <TouchableOpacity
                        style={styles.overlay}
                        activeOpacity={0.5} //TODO, test if it works in iOS too
                        onPress={this.onOverlayPress}
                    />
                )} */}
                <Animated.View
                    style={[styles.contentContainer, this._testStyle()]}
                    onLayout={event => this._onContainerLayout(event)}
                >
                    <TouchableOpacity
                        onLayout={event => this._onHeaderLayout(event)}
                        style={styles.contentHeader}
                        activeOpacity={1}
                        onPress={this.onHeaderPress}
                    >
                        <View style={styles.knob} />
                        <View style={styles.header}>{this.props.header}</View>
                    </TouchableOpacity>
                    <View style={styles.content}>{this.props.children}</View>
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
                        visible={this.state.visible || this.isLoaded()}
                        onRequestClose={this.onModalRequestClose}
                    >
                        {this._container()}
                    </Modal>
                ) : (this._container())}
            </>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        //position: "absolute", //TODO, test if it works in iOS too
        backgroundColor: "#000000",
        opacity: 0.5,
        height: screenHeight, //Device height
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
    contentHeader: {

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
    header: {

    },
    content: {},
    safeAreaBottom: {
        height: initialWindowSafeAreaInsets.bottom
    }
});