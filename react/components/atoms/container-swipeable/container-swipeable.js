import React, { PureComponent } from "react";
import { Animated, StyleSheet, Modal, View, TouchableOpacity } from "react-native";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

import PropTypes from "prop-types";

export class ContainerSwipeable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            modalVisble: false,
            containerChildrenHeight: null,
            containerBackgroundColorAnimated: new Animated.Value(0),
            containerInnerHeightAnimated: new Animated.Value(0)
        };

        this.animationOccurring = false;
        this.animationsDuration = 1000;
        this.hitSlop = { top: 20, left: 20, right: 20, bottom: 20 };
    }

    static get propTypes() {
        return {
            onRef: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            onRef: () => null
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    onModalRequestClose() {
        return null;
    }

    toogle = () => {
        if (this.animationOccurring) {
            return;
        }

        if (this.state.modalVisble) {
            this._toogleAnimations();
            setTimeout(() => {
                this.setState({ modalVisble: false });
            }, this.animationsDuration);
        } else {
            this.setState(
                {
                    modalVisble: true
                },
                () => {
                    this._toogleAnimations();
                }
            );
        }
    };

    onLayout = event => {
        this.setState({
            containerChildrenHeight: event.nativeEvent.layout.height
        });
    };

    _onAnimationEnd = () => {
        this.animationOccurring = false;
    };

    _toogleAnimations = () => {
        this.animationOccurring = true;

        Animated.parallel([
            Animated.timing(this.state.containerBackgroundColorAnimated, {
                toValue: this.state.containerBackgroundColorAnimated._value ? 0 : 1,
                duration: this.animationsDuration
            }),
            Animated.timing(this.state.containerInnerHeightAnimated, {
                toValue: this.state.containerInnerHeightAnimated._value ? 0 : 1,
                duration: this.animationsDuration
            })
        ]).start(this._onAnimationEnd);
    };

    _containerStyles() {
        return [
            styles.containerSwipeable,
            {
                backgroundColor: this.state.containerBackgroundColorAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["rgba(29,38,49,0)", "rgba(29,38,49,0.35)"]
                })
            }
        ];
    }

    _containerInnerStyles() {
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
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalVisble}
                onRequestClose={this.onModalRequestClose}
            >
                <Animated.View
                    style={this._containerStyles()}
                    onStartShouldSetResponder={this.toogle}
                >
                    <Animated.View
                        style={this._containerInnerStyles()}
                        removeClippedSubviews={true}
                    >
                        <View
                            onLayout={this.onLayout}
                            onStartShouldSetResponder={() => true}
                            pointerEvents="auto"
                        >
                            <TouchableOpacity
                                style={styles.buttonBar}
                                onPress={this.toogle}
                                hitSlop={this.hitSlop}
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
