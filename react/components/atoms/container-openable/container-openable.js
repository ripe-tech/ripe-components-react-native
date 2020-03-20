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
            onVisible: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 300,
            modal: false,
            header: undefined,
            headerPressable: true,
            headerProps: {},
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
        this.animating = false;
    }

    isVisible = () => this.state.visible;

    contentHeight = () => this.containerHeight - this.headerHeight;

    setContentHeight = height => this.state.contentHeight.setValue(height);

    setOverlayOpacity = opacity => this.state.overlayOpacity.setValue(opacity);

    _isLoaded = () => {
        return this.state.containerHeightLoaded && this.state.headerHeightLoaded;
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
                position: this.props.modal ? undefined : "absolute",
                opacity: this.state.overlayOpacity
            }
        ];
    };

    _containerStyle = () => {
        if (!this._isLoaded()) {
            return [styles.contentContainer, { opacity: 0 }];
        }

        return [
            styles.contentContainer,
            {
                height: this.state.contentHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.headerHeight, this.containerHeight]
                }),
                maxHeight: this.props.modal ? screenHeight : this.containerPosY
            }
        ];
    };

    _container = () => {
        return (
            <>
                <Animated.View
                    style={this._overlayStyle()}
                    onStartShouldSetResponder={e => true}
                    onResponderRelease={this.onOverlayPress}
                />
                <Animated.View
                    style={this._containerStyle()}
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