
import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, View, Dimensions, TouchableOpacity, Animated, Easing } from "react-native";
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
            animationsDuration: 5000,
            onVisible: visible => {}, 
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            initialLoading: true,
            visible: false,
            heightAnimationValue: new Animated.Value(0),
        };

        this.modalHeight= 0;
        this.animating = false;
    }

    open() {
        console.log("stuff");
        Animated.timing(
            this.state.heightAnimationValue,
            {
              toValue: 1,
              duration: this.props.animationsDuration,
              easing: Easing.inOut(Easing.ease)
            }
          ).start();
          
        this.setState({visible: true});
    }

    close() {
        this.setState({visible: false});
    }

    onOverlayPress = () => {
        console.log("yaaa")
        this.close();
    }

    onModalRequestClose = () => {
        this.close();
    }

    onModalLayout = event => {
        this.modalHeight=event.nativeEvent.layout.height;
        this.setState({initialLoading: false});
        console.log("stuff");
        console.log(this.modalHeight);
    }

    _testStyle = () => {
        const heightValue = this.state.heightAnimationValue.interpolate({inputRange: [0, 1], outputRange: ["0%", "100%"]})
        const translateValue = this.state.heightAnimationValue.interpolate({inputRange: [0, 1], outputRange: ["100%", "0%"]})

        return { 
            height: heightValue,
            transform: [{translateY: this.modalHeight}]
        }
    }

    _container = () => {
        return (
            <>
            {!this.state.initialLoading && <TouchableOpacity style={styles.overlay} activeOpacity={0} onPress={this.onOverlayPress} />}
            <Animated.View style={[styles.contentContainer, this._testStyle()]} ref={el => (this.containerComponent = el)} >
                <View style={styles.knob} />
                <View style={styles.content}>{this.props.children}</View>
                <View style={styles.safeAreaBottom} />
            </Animated.View>
            </>
        );
    };

    render() {
        return (
            <Modal style={styles.modal} visible={this.state.visible || this.state.initialLoading} onRequestClose={this.onModalRequestClose} onLayout={event => this.onModalLayout(event)}>
                {this._container() }
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
        
        //height: "100%",
        //top: 50,
        //transform: [{translateY: "250%"}]
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
    content: {},
    safeAreaBottom: {
        height: initialWindowSafeAreaInsets.bottom
    }
});





/* 
import React, { PureComponent } from "react";
import { Animated, StyleSheet, Modal, View, TouchableOpacity, PanResponder } from "react-native";
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
            containerInnerHeightAnimated: new Animated.Value(0.5)
        };

        this.animating = false;
        this.moving = false;




        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            // onStartShouldSetPanResponder: (evt, gestureState) => true,
            // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            // onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      
            onPanResponderGrant: (evt, gestureState) => {
                console.log("onPanResponderGrant")

              // The gesture has started. Show visual feedback so the user knows
              // what is happening!
              // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: (evt, gestureState) => {
                this.moving = true;
                let val = gestureState.dy / 180; //TODO total height instead of hardcoded val
                if(val < 0) val = 1-val;
                console.log("move:\t", gestureState.dy, "val: ", val, this.state.containerChildrenHeight);

                this.state.containerInnerHeightAnimated.setValue(val);
              // The most recent move distance is gestureState.move{X,Y}
              // The accumulated gesture distance since becoming responder is
              // gestureState.d{x,y}
            }
          });

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
        if(this.moving) return;

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
                <Animated.View
                    style={this._containerStyle()}
                >
                    <Animated.View
                        style={this._containerInnerStyle()}
                        onStartShouldSetResponder={() => true}
                        {...this._panResponder.panHandlers} 
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
        );
    }
}

const styles = StyleSheet.create({
    containerSwipeable: {
        position: "absolute",
        bottom: 0,
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
