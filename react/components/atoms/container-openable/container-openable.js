import React, { PureComponent } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Modal,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

let screenHeight = Dimensions.get("window").height - initialWindowSafeAreaInsets.top;
if (Platform.OS === "android") screenHeight -= StatusBar.currentHeight;

export class ContainerOpenable extends PureComponent {
    static get propTypes() {
        return {
            animationsDuration: PropTypes.number,
            targetOverlayOpacity: PropTypes.number,
            modal: PropTypes.bool,
            header: PropTypes.element,
            headerPressable: PropTypes.bool,
            headerProps: PropTypes.object,
            contentProps: PropTypes.object,
            showKnob: PropTypes.bool,
            overlay: PropTypes.bool,
            overlayPress: PropTypes.bool,
            onContentHeight: PropTypes.func,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 175,
            targetOverlayOpacity: 0.5,
            modal: true,
            header: undefined,
            headerPressable: true,
            headerProps: {},
            contentProps: {},
            showKnob: true,
            overlay: true,
            overlayPress: true,
            onContentHeight: height => {},
            onVisible: visible => {},
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            containerHeightLoaded: false,
            headerHeightLoaded: false,
            visible: false,
            showOverlay: false,
            overlayOpacity: new Animated.Value(0),
            contentHeight: new Animated.Value(0),
            containerHeight: 0
        };

        this.state.contentHeight.addListener(h => this.props.onContentHeight(h.value));

        this.headerHeight = 0;
        this.containerPosY = 0;
        this.animating = false;
    }

    isVisible = () => this.state.visible;

    contentHeight = () => this.state.containerHeight - this.headerHeight;

    setContentHeight = height => this.state.contentHeight.setValue(height);

    setContainerHeight = height => this.setState({ containerHeight: height });

    setOverlayOpacity = opacity => {
        this.state.overlayOpacity.setValue(opacity);
        this.setState({ showOverlay: opacity > 0 });
    };

    _isLoaded = () => {
        return this.state.containerHeightLoaded && this.state.headerHeightLoaded;
    };

    open() {
        if (this.animating) return;

        this.animating = true;

        this.setState({ visible: true, showOverlay: true }, () => {
            this.props.onVisible(true);

            Animated.parallel([
                Animated.timing(this.state.contentHeight, {
                    toValue: 1,
                    duration: this.props.animationsDuration,
                    useNativeDriver: false,
                    easing: Easing.inOut(Easing.ease)
                }),
                Animated.timing(this.state.overlayOpacity, {
                    toValue: this.props.targetOverlayOpacity,
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
                useNativeDriver: false,
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
            this.setState({ visible: false, showOverlay: false }, () =>
                this.props.onVisible(false)
            );
        });
    }

    toggle() {
        if (this.state.visible) this.close();
        else this.open();
    }

    onOverlayPress = () => {
        if (this.props.overlayPress) this.close();
    };

    onModalRequestClose = () => {
        this.close();
    };

    onHeaderPress = () => {
        this.toggle();
    };

    _onContainerLayout = event => {
        if (this.state.containerHeightLoaded) return;

        const containerHeight = event.nativeEvent.layout.height;
        this.containerPosY = event.nativeEvent.layout.y + containerHeight;

        this.setState({ containerHeightLoaded: true, containerHeight: containerHeight });
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
                position: this.props.modal ? undefined : "absolute",
                opacity: this.state.overlayOpacity
            }
        ];
    };

    _containerStyle = () => {
        if (!this._isLoaded()) {
            return [styles.contentContainer, this.props.style, { opacity: 0 }];
        }

        return [
            styles.contentContainer,
            this.props.style,
            {
                height: this.state.contentHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.headerHeight, this.state.containerHeight]
                })
            }
        ];
    };

    _container = () => {
        return (
            <>
                {this.props.overlay && this.state.showOverlay ? (
                    <Animated.View
                        style={this._overlayStyle()}
                        onStartShouldSetResponder={e => this.state.showOverlay}
                        onResponderRelease={this.onOverlayPress}
                    />
                ) : null}
                <Animated.View
                    style={this._containerStyle()}
                    {...this.props.contentProps}
                    onLayout={event => this._onContainerLayout(event)}
                >
                    {this.props.headerPressable ? (
                        <TouchableOpacity
                            onLayout={event => this._onHeaderLayout(event)}
                            activeOpacity={1}
                            onPress={this.onHeaderPress}
                            {...this.props.headerProps}
                        >
                            {this.props.showKnob ? <View style={styles.knob} /> : null}
                            {this.props.header}
                        </TouchableOpacity>
                    ) : (
                        <View
                            onLayout={event => this._onHeaderLayout(event)}
                            {...this.props.headerProps}
                        >
                            {this.props.showKnob ? <View style={styles.knob} /> : null}
                            {this.props.header}
                        </View>
                    )}
                    {this.props.children}
                    {this.props.modal && <View style={styles.safeAreaBottom} />}
                </Animated.View>
            </>
        );
    };

    render() {
        return (
            <>
                {this.props.modal ? (
                    <Modal
                        style={styles.modal}
                        transparent={true}
                        visible={this.state.visible || !this._isLoaded()}
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
    contentContainer: {
        backgroundColor: "#ffffff",
        position: "absolute",
        width: "100%",
        bottom: 0
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
