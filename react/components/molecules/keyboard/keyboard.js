import React, { Component } from "react";
import { Animated, StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { Button } from "../../atoms";

export class Keyboard extends Component {
    static get propTypes() {
        return {
            supportedCharacters: PropTypes.string,
            symbolicKeyboard: PropTypes.bool,
            capsLock: PropTypes.bool,
            animate: PropTypes.bool,
            onBackspacePress: PropTypes.func,
            onBackspaceLongPress: PropTypes.func,
            onKeyPress: PropTypes.func,
            onKeyLongPress: PropTypes.func,
            style: ViewPropTypes.style,
            keyStyle: ViewPropTypes.style,
            keyContainerStyle: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            supportedCharacters: "0123456789abcdefghijklmnopqrstuvwxyz",
            symbolicKeyboard: false,
            capsLock: true,
            animate: true,
            onBackspacePress: () => {},
            onBackspaceLongPress: () => {},
            onKeyPress: value => {},
            onKeyLongPress: value => {},
            style: {},
            keyStyle: {},
            keyContainerStyle: {}
        };
    }

    constructor(props) {
        super(props);

        this.keys = "1234567890qwertyuiopasdfghjklzxcvbnm";
        this.keyColumns = [10, 10, 9, 9];
        this.keyboardHiddenPositionY = 212;

        this.state = {
            symbolicKeyboard: this.props.symbolicKeyboard,
            animationPositionY: new Animated.Value(this.keyboardHiddenPositionY),
            animationOpacity: new Animated.Value(0)
        };
    }

    async componentDidMount() {
        await this.showKeyboardAnimated();
    }

    showKeyboardAnimated = async (animationDuration = 250) => {
        if (!this.props.animate) return;

        await this._animateKeyboard(0, 1, animationDuration);
    };

    hideKeyboardAnimated = async (animationDuration = 200) => {
        if (!this.props.animate) return;

        await this._animateKeyboard(this.keyboardHiddenPositionY, 0, animationDuration);
    };

    _animateKeyboard = async (positionY, opacity, duration) => {
        return new Promise(resolve => {
            Animated.parallel([
                Animated.timing(this.state.animationPositionY, {
                    toValue: positionY,
                    duration: duration,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.animationOpacity, {
                    toValue: opacity,
                    duration: duration,
                    useNativeDriver: true
                })
            ]).start(() => {
                resolve();
            });
        });
    };

    _keyObject = key => {
        return {
            value: typeof key === "object" ? key.value : key,
            label: typeof key === "object" ? key.label || key.value : key,
            buttonProps: key.buttonProps || {}
        };
    };

    _keyDisabled = key => {
        return !this.props.supportedCharacters.toLowerCase().includes(key.value.toLowerCase());
    };

    _specialChars = () => {
        return [...this.props.supportedCharacters.replace(/[a-zA-Z\d:]/g, "")];
    };

    _hasSpecialChars = () => {
        const specialChars = this._specialChars();
        if (!specialChars) return false;
        return specialChars.length > 0;
    };

    _toggleSymbolsMode = () => {
        this.setState(({ symbolicKeyboard }) => ({
            symbolicKeyboard: !symbolicKeyboard
        }));
    };

    _addActionKeys = keys => {
        keys.unshift({
            value: "emoji",
            buttonProps: {
                text: null,
                disabled: !this._hasSpecialChars(),
                iconColor: "#ffffff",
                iconFillColor: "transparent",
                icon: "happy-face",
                onPress: () => this.onEmojiPress()
            }
        });
        keys.push({
            value: "backspace",
            buttonProps: {
                text: null,
                iconFillColor: "transparent",
                disabled: false,
                icon: "delete",
                onPress: () => this.onBackspacePress(),
                onLongPress: () => this.onBackspaceLongPress()
            }
        });
    };

    _symbolicKeys = () => {
        return [
            {
                value: "emoji",
                buttonProps: {
                    text: null,
                    disabled: false,
                    icon: "text",
                    iconFillColor: "transparent",
                    onPress: () => this.onEmojiPress()
                }
            },
            {
                value: "backspace",
                buttonProps: {
                    text: null,
                    iconFillColor: "transparent",
                    disabled: false,
                    icon: "delete",
                    onPress: () => this.onBackspacePress(),
                    onLongPress: () => this.onBackspaceLongPress()
                }
            },
            ...(this._specialChars() || [])
        ];
    };

    onEmojiPress = () => {
        this._toggleSymbolsMode();
    };

    onBackspacePress = () => {
        this.props.onBackspacePress();
    };

    onBackspaceLongPress = () => {
        this.props.onBackspaceLongPress();
    };

    onButtonPress = value => {
        const formattedValue = this.props.capsLock ? value.toUpperCase() : value;
        this.props.onKeyPress(formattedValue);
    };

    onButtonLongPress = value => {
        const formattedValue = this.props.capsLock ? value.toUpperCase() : value;
        this.props.onKeyLongPress(formattedValue);
    };

    _style = () => {
        return [
            styles.keyboard,
            this.props.animate
                ? {
                      transform: [{ translateY: this.state.animationPositionY }],
                      opacity: this.state.animationOpacity
                  }
                : {},
            this.props.style
        ];
    };

    _keyStyle = () => {
        return [styles.key, this.props.keyStyle];
    };

    _quertyKeyboardRowStyle = () => {
        return [styles.quertyKeyboardRow, this.props.qwertyKeyboardRowStyle];
    };

    _symbolicKeyboardStyle = () => {
        return [styles.symbolicKeyboard, this.props.symbolicKeyboardStyle];
    };

    _keyContainerStyle = () => {
        return [styles.keyContainer, this.props.keyContainerStyle];
    };

    _containerStyle = () => {
        return [styles.keyboardContainer, this.props.containerStyle];
    };

    _renderKey = keyData => {
        const key = this._keyObject(keyData);
        return (
            <Button
                style={this._keyStyle()}
                containerStyle={this._keyContainerStyle()}
                backgroundColor={"#323232"}
                disabled={this._keyDisabled(key)}
                text={key.label?.toUpperCase()}
                key={key.value}
                onPress={() => this.onButtonPress(key.value)}
                onLongPress={() => this.onButtonLongPress(key.value)}
                {...key.buttonProps}
            />
        );
    };

    _renderQwertyKeyboardRow = (rowKeys, index) => {
        return (
            <View style={this._quertyKeyboardRowStyle()} key={index}>
                {rowKeys.map(key => this._renderKey(key))}
            </View>
        );
    };

    _renderQwertyKeyboard = () => {
        const keys = this.keys.split("");
        return this.keyColumns.map((numberOfKeys, index) => {
            const rowKeys = keys.splice(0, numberOfKeys);
            const isLastRow = this.keyColumns.length - 1 === index;
            if (isLastRow) this._addActionKeys(rowKeys);
            return this._renderQwertyKeyboardRow(rowKeys, index);
        });
    };

    _renderSymbolicKeyboard = () => {
        const symbolKeys = this._symbolicKeys();
        return (
            <View style={this._symbolicKeyboardStyle()}>
                {symbolKeys.map(key => this._renderKey(key))}
            </View>
        );
    };

    render() {
        return (
            <Animated.ScrollView
                directionalLockEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                style={this._style()}
                containerStyle={this._containerStyle()}
            >
                {this.state.symbolicKeyboard
                    ? this._renderSymbolicKeyboard()
                    : this._renderQwertyKeyboard()}
            </Animated.ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    keyboard: {
        width: 480,
        height: 212
    },
    keyboardContainer: {
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center"
    },
    symbolicKeyboard: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    quertyKeyboardRow: {
        flexDirection: "row",
        justifyContent: "center"
    },
    keyContainer: {
        paddingHorizontal: 0,
        height: 51
    },
    key: {
        borderRadius: 10,
        width: 46,
        margin: 1,
        flexShrink: 1
    }
});

export default Keyboard;
