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
    Modal,
    TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

let screenHeight = Dimensions.get("window").height - initialWindowSafeAreaInsets.top;
if (Platform.OS === "android") screenHeight -= StatusBar.currentHeight;

export class ContainerOpenable extends PureComponent {
    static get propTypes() {
        return {
            animationsDuration: PropTypes.number,
            modal: PropTypes.bool,
            header: PropTypes.element,
            headerPressable: PropTypes.bool,
            headerProps: PropTypes.object,
            onContentHeight: PropTypes.func,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 300,
            modal: true,
            header: undefined,
            headerPressable: true,
            headerProps: {},
            onContentHeight: height => {},
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
            showOverlay: false,
            overlayOpacity: new Animated.Value(0),
            contentHeight: new Animated.Value(0),
            containerKey: 0 //Used to force remount
        };

        this.state.contentHeight.addListener(h => this.props.onContentHeight(h.value));

        this.headerHeight = 0;
        this.containerHeight = 0;
        this.containerPosY = 0;
        this.animating = false;
        this.remountingContainer = false;
    }

    isVisible = () => this.state.visible;

    contentHeight = () => this.containerHeight - this.headerHeight;

    setContentHeight = height => this.state.contentHeight.setValue(height);

    setOverlayOpacity = opacity => {
        this.state.overlayOpacity.setValue(opacity);
        this.setState({ showOverlay: opacity > 0 });
    };

    _isLoaded = () => {
        return this.state.containerHeightLoaded && this.state.headerHeightLoaded;
    };

    remountContainer = () => {
        requestAnimationFrame(() => {
            this.remountingContainer = true;
            this.setState({ containerKey: Date.now(), containerHeightLoaded: false }, () => {});
        });
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

        const previousHeight = this.containerHeight;

        this.containerHeight = event.nativeEvent.layout.height;
        this.containerPosY = event.nativeEvent.layout.y + this.containerHeight;

        this.setState({ containerHeightLoaded: true }, () => {
            if (this.remountingContainer && previousHeight > 0) {
                this.animating = true;
                this.setContentHeight(previousHeight / this.containerHeight);
                Animated.timing(this.state.contentHeight, {
                    toValue: 1,
                    duration: this.props.animationsDuration,
                    easing: Easing.inOut(Easing.ease)
                }).start(() => {
                    this.animating = false;
                    this.remountingContainer = false;
                });
            }
        });
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
                    outputRange: [this.headerHeight, this.containerHeight]
                })
            }
        ];
    };

    _container = () => {
        return (
            <>
                {this.state.showOverlay ? (
                    <Animated.View
                        style={this._overlayStyle()}
                        onStartShouldSetResponder={e => this.state.showOverlay}
                        onResponderRelease={this.onOverlayPress}
                    />
                ) : null}
                <Animated.View
                    style={this._containerStyle()}
                    key={this.state.containerKey}
                    onLayout={event => this._onContainerLayout(event)}
                >
                    {this.props.headerPressable ? (
                        <TouchableOpacity
                            onLayout={event => this._onHeaderLayout(event)}
                            activeOpacity={1}
                            onPress={this.onHeaderPress}
                            {...this.props.headerProps}
                        >
                            <View style={styles.knob} />
                            {this.props.header}
                        </TouchableOpacity>
                    ) : (
                        <View
                            onLayout={event => this._onHeaderLayout(event)}
                            {...this.props.headerProps}
                        >
                            <View style={styles.knob} />
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
