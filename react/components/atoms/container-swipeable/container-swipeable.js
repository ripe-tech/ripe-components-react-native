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

        if (this.state.modalVisible) {
            this._toggleAnimations();
            setTimeout(() => {
                this.setState({ modalVisible: false });
            }, this.props.animationsDuration);
        } else {
            this.setState(
                {
                    modalVisible: true
                },
                () => {
                    this._toggleAnimations();
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
        this.animating = false;
    };

    _toggleAnimations = () => {
        this.animating = true;

        Animated.parallel([
            Animated.timing(this.state.containerBackgroundColorAnimated, {
                toValue: this.state.containerBackgroundColorAnimated._value ? 0 : 1,
                duration: this.props.animationsDuration
            }),
            Animated.timing(this.state.containerInnerHeightAnimated, {
                toValue: this.state.containerInnerHeightAnimated._value ? 0 : 1,
                duration: this.props.animationsDuration
            })
        ]).start(this._onAnimationEnd);
    };

    _containerStyles() {
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
            <Modal animationType="none" transparent={true} visible={this.state.modalVisible}>
                <Animated.View
                    style={this._containerStyles()}
                    onStartShouldSetResponder={this.toggle}
                >
                    <Animated.View style={this._containerInnerStyles()}>
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
