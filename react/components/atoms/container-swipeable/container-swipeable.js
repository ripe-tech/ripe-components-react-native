
import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, View, Dimensions, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";


const screenHeight = Dimensions.get("screen").height - initialWindowSafeAreaInsets.top;

export class ContainerSwipeable extends PureComponent {
    static get propTypes() {
        return {
            animationsDuration: PropTypes.number,
            onVisible: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 300,
            onVisible: visible => {}, 
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.animating = false;
    }
    

    open() {
        this.setState({visible: true});
    }

    close() {
        this.setState({visible: false});
    }

    onOverlayPress = () => {
        this.close();
    }

    onModalRequestClose = () => {
        this.close();
    }

    _container = () => {
        return (
            <>
            <TouchableOpacity style={styles.overlay} onPress={this.onOverlayPress} />
            <View style={[styles.contentContainer, /* { height: "100%" } */]}>
                <View style={styles.knob} />
                <View>{this.props.children}</View>
                <View style={styles.safeAreaBottom} />
            </View>
            </>
        );
    };

    render() {
        return (
            <Modal style={styles.modal} visible={this.state.visible} onRequestClose={this.onModalRequestClose}>
                {this._container()}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
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
        backgroundColor: "#aaffff",
        
        
        height: "100%"
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





/*
import React, { PureComponent } from "react";
import { Animated, StyleSheet, Modal, View, TouchableOpacity } from "react-native";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";
import PropTypes from "prop-types";

export class ContainerSwipeable extends PureComponent {
    static get propTypes() {
        return {
            animationsDuration: PropTypes.number,
            hitSlop: PropTypes.shape({
                top: PropTypes.number.isRequired,
                left: PropTypes.number.isRequired,
                right: PropTypes.number.isRequired,
                bottom: PropTypes.number.isRequired
            })
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 300,
            hitSlop: { top: 20, left: 20, right: 20, bottom: 20 }
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            modalVisible: false,
            containerChildrenHeight: null,
            containerBackgroundColorAnimated: new Animated.Value(0),
            containerInnerHeightAnimated: new Animated.Value(0)
        };

        this.animating = false;
    }

    toggle = () => {
        if (this.animating) {
            return;
        }

        if (this.state.visible) {
            this.setState(
                {
                    visible: false
                },
                () => {
                    this.startAnimations();
                }
            );
        } else {
            this.setState(
                {
                    visible: true,
                    modalVisible: true
                },
                () => {
                    this.startAnimations();
                }
            );
        }
    };

    onLayout = event => {
        this.setState({
            containerChildrenHeight: event.nativeEvent.layout.height
        });
    };

    startAnimations = () => {
        this.animating = true;

        Animated.parallel([
            Animated.timing(this.state.containerBackgroundColorAnimated, {
                toValue: this.state.visible ? 1 : 0,
                duration: this.props.animationsDuration
            }),
            Animated.timing(this.state.containerInnerHeightAnimated, {
                toValue: this.state.visible ? 1 : 0,
                duration: this.props.animationsDuration
            })
        ]).start(() => {
            this.setState(
                {
                    modalVisible: this.state.visible
                },
                () => {
                    this.animating = false;
                }
            );
        });
    };

    _containerStyle() {
        return [
            styles.containerSwipeable,
            {
                backgroundColor: this.state.containerBackgroundColorAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["rgba(29, 38, 49, 0)", "rgba(29, 38, 49, 0.35)"]
                })
            }
        ];
    }

    _containerInnerStyle() {
        return [
            styles.containerInner,
            {
                height: this.state.containerInnerHeightAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, this.state.containerChildrenHeight]
                })
            }
        ];
    }

    render() {
        return (
            <Modal animationType="none" transparent={true} visible={this.state.modalVisible}>
                <Animated.View
                    style={this._containerStyle()}
                    onStartShouldSetResponder={this.toggle}
                >
                    <Animated.View
                        style={this._containerInnerStyle()}
                        onStartShouldSetResponder={() => true}
                    >
                        <View onLayout={this.onLayout} pointerEvents="auto">
                            <TouchableOpacity
                                style={styles.buttonBar}
                                onPress={this.toggle}
                                hitSlop={this.props.hitSlop}
                            />
                            {this.props.children}
                            <View style={styles.safeAreaBottom} />
                        </View>
                    </Animated.View>
                </Animated.View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    containerSwipeable: {
        overflow: "hidden",
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "flex-end"
    },
    containerInner: {
        overflow: "hidden",
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        backgroundColor: "#ffffff"
    },
    safeAreaBottom: {
        paddingBottom: initialWindowSafeAreaInsets.bottom
    },
    buttonBar: {
        alignSelf: "center",
        marginVertical: 6,
        width: 50,
        height: 5,
        opacity: 0.15,
        borderRadius: 100,
        backgroundColor: "#1a2632"
    }
});

 */
