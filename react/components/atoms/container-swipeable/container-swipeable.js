import React, { PureComponent } from "react";
import {
    Animated,
    StyleSheet,
    Modal,
    View,
    TouchableOpacity,
    PanResponder,
    Dimensions
} from "react-native";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";
import PropTypes from "prop-types";

//@TODO This method for AndroidSoftBar
const AndroidSoftBar = Dimensions.get("screen").height - Dimensions.get("window").height;
const ScreenHeight = Dimensions.get("screen").height - initialWindowSafeAreaInsets.top;

export class ContainerSwipeable extends PureComponent {
    static get propTypes() {
        return {
            animationsDuration: PropTypes.number,
            hitSlop: PropTypes.shape({
                top: PropTypes.number.isRequired,
                left: PropTypes.number.isRequired,
                right: PropTypes.number.isRequired,
                bottom: PropTypes.number.isRequired
            }),
            hideThreshold: PropTypes.number
        };
    }

    static get defaultProps() {
        return {
            animationsDuration: 300,
            hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
            hideThreshold: 100
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            itemsVisible: false,
            modalVisible: false,
            containerChildrenHeight: 0,
            containerBackgroundColorAnimated: new Animated.Value(0),
            containerInnerPositionAnimated: new Animated.ValueXY({ x: 0, y: ScreenHeight })
        };

        this._initialViewPositionY = ScreenHeight;
        this.animating = false;

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (_evt, _gestureState) => true,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease
        });
    }

    onPanResponderGrant = (_evt, _gestureState) => {
        this._initialViewPositionY = this.state.containerInnerPositionAnimated.__getValue().y;
    };

    onPanResponderMove = (_evt, gestureState) => {
        if (gestureState.dy === 0) {
            return;
        }

        //if the user is going up, we slow down the up movement  on each interaction
        let gestureStateDistanceY = gestureState.dy > 0 ? gestureState.dy : gestureState.dy / 2;

        const nextViewPositionY = this._nextViewPositionY(gestureStateDistanceY);
        const hasReachedMaxTopPosition = nextViewPositionY <= 0;

        if (hasReachedMaxTopPosition) {
            return;
        }

        this.state.containerInnerPositionAnimated.setValue({
            x: 0,
            y: nextViewPositionY
        });
    };

    onPanResponderRelease = (_evt, gestureState) => {
        const nextViewPositionY = this._nextViewPositionY(gestureState.dy);
        const isInsideOfCloseThreshold =
            nextViewPositionY - this.props.hideThreshold >
            ScreenHeight - this.state.containerChildrenHeight;

        if (isInsideOfCloseThreshold) {
            this.toggle();
        } else {
            const toValue = { x: 0, y: this._initialViewPositionY };

            Animated.spring(this.state.containerInnerPositionAnimated, {
                toValue,
                duration: this.props.animationsDuration
            }).start();
        }
    };

    toggle = () => {
        if (this.animating) {
            return;
        }

        if (this.state.itemsVisible) {
            this.setState(
                {
                    itemsVisible: false
                },
                this._toggleAnimations
            );
        } else {
            this.setState({
                itemsVisible: true,
                modalVisible: true
            });
        }
    };

    onLayout = event => {
        if (this.state.containerChildrenHeight) {
            return;
        }
        this.setState(
            {
                containerChildrenHeight: event.nativeEvent.layout.height + AndroidSoftBar
            },
            this._toggleAnimations
        );
    };

    _nextViewPositionY(gestureStateDistanceY) {
        return this._initialViewPositionY + gestureStateDistanceY;
    }

    _calculateInitialPositionY() {
        const isScreenBiggerThanChildren = ScreenHeight > this.state.containerChildrenHeight;
        const x = 0;
        let y = 0;

        if (this.state.itemsVisible) {
            if (isScreenBiggerThanChildren) {
                y = ScreenHeight - this.state.containerChildrenHeight;
            }
        } else {
            y = ScreenHeight;
        }

        return { x, y };
    }

    _toggleAnimations = () => {
        this.animating = true;

        Animated.parallel([
            Animated.timing(this.state.containerBackgroundColorAnimated, {
                toValue: this.state.itemsVisible ? 1 : 0,
                duration: this.props.animationsDuration
            }),
            Animated.timing(this.state.containerInnerPositionAnimated, {
                toValue: this._calculateInitialPositionY(),
                duration: this.props.animationsDuration
            })
        ]).start(() => {
            this.setState(
                state => ({
                    modalVisible: this.state.itemsVisible,
                    containerChildrenHeight: this.state.itemsVisible
                        ? state.containerChildrenHeight
                        : 0
                }),
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
                transform: this.state.containerInnerPositionAnimated.getTranslateTransform()
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
                        {...this.panResponder.panHandlers}
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
        backgroundColor: "#ffffff",
        height: "100%",
        maxHeight: ScreenHeight
    },
    safeAreaBottom: {
        paddingBottom: initialWindowSafeAreaInsets.bottom + 20
    },
    buttonBar: {
        marginVertical: 6,
        alignSelf: "center",
        width: 50,
        height: 5,
        opacity: 0.15,
        borderRadius: 100,
        backgroundColor: "#1a2632"
    }
});
