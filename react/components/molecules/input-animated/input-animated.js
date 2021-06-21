import React, { PureComponent } from "react";
import { Animated, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Input, Touchable } from "../../atoms";

export class InputAnimated extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            header: PropTypes.string,
            borderBottomActiveColor: PropTypes.string,
            placeholder: PropTypes.string,
            value: PropTypes.string,
            onValueUpdate: PropTypes.func,
            onBlur: PropTypes.func,
            onFocus: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            header: undefined,
            borderBottomActiveColor: "#4f7af8",
            placeholder: undefined,
            value: undefined,
            onValueUpdate: value => {},
            onFocus: () => {},
            onBlur: () => {}
        };
    }

    constructor(props) {
        super(props);

        this.headerTextYPositionBlur = 5;
        this.headerTextYPositionFocus = 30;

        this.textFontSizeBlur = 16;
        this.textFontSizeFocus = 12;

        this.headerTextColorBlur = 0;
        this.headerTextColorFocus = 1;

        this.underlineOpacityBlur = 1;
        this.underlineOpacityFocus = 0;

        this.underlineYTransformBlur = 0;
        this.underlineYTransformFocus = -20;

        this.inputBorderOpacityBlur = 0;
        this.inputBorderOpacityFocus = 1;

        this.inputYTransformBlur = 0;
        this.inputYTransformFocus = -35;

        this.state = {
            valueData: this.props.value,
            focused: true,
            headerTextYPosition: new Animated.Value(this.headerTextYPositionBlur),
            textFontSize: new Animated.Value(this.textFontSizeBlur),
            headerTextColor: new Animated.Value(this.headerTextColorBlur),
            underlineOpacity: new Animated.Value(this.underlineOpacityBlur),
            underlineYTransform: new Animated.Value(this.underlineYTransformBlur),
            inputBorderOpacity: new Animated.Value(this.inputBorderOpacityBlur),
            inputYTransform: new Animated.Value(this.inputYTransformBlur)
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState(
                {
                    valueData: this.props.value
                },
                () => {
                    this.focus();
                }
            );
        }
    }

    _headerTextStyle = () => {
        return [
            styles.headerText,
            {
                bottom: this.state.headerTextYPosition
            }
        ];
    };

    _textStyle = () => {
        return [
            {
                color: this.state.headerTextColor.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#4f4f4f", "#4f7af8"]
                }),
                fontSize: this.state.textFontSize
            }
        ];
    };

    _underlineStyle = () => {
        return [
            styles.headerUnderline,
            {
                opacity: this.state.underlineOpacity,
                transform: [{ translateY: this.state.underlineYTransform }]
            }
        ];
    };

    _inputStyle = () => {
        return [
            styles.input,
            {
                borderBottomColor: this.state.focused
                    ? this.props.borderBottomActiveColor
                    : "#c3c9cf",
                transform: [{ translateY: this.state.inputYTransform }],
                opacity: this.state.inputBorderOpacity
            }
        ];
    };

    _style = () => {
        return [styles.inputAnimated];
    };

    _onFocus = () => {
        this.setState({ focused: true }, () => {
            this.props.onFocus();
        });
    };

    _onBlur = () => {
        this.setState({ focused: false }, () => {
            this.props.onBlur();
        });
    };

    _animateInput = ({ blur = false }) => {
        if (blur && Boolean(this.state.valueData)) {
            this.input.blur();
            return;
        }

        Animated.parallel([
            Animated.timing(this.state.headerTextYPosition, {
                toValue: blur ? this.headerTextYPositionBlur : this.headerTextYPositionFocus,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(this.state.headerTextColor, {
                toValue: blur ? this.headerTextColorBlur : this.headerTextColorFocus,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(this.state.textFontSize, {
                toValue: blur ? this.textFontSizeBlur : this.textFontSizeFocus,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(this.state.underlineOpacity, {
                toValue: blur ? this.underlineOpacityBlur : this.underlineOpacityFocus,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(this.state.underlineYTransform, {
                toValue: blur ? this.underlineYTransformBlur : this.underlineYTransformFocus,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(this.state.inputBorderOpacity, {
                toValue: blur ? this.inputBorderOpacityBlur : this.inputBorderOpacityFocus,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(this.state.inputYTransform, {
                toValue: blur ? this.inputYTransformBlur : this.inputYTransformFocus,
                duration: 300,
                useNativeDriver: false
            })
        ]).start(() => {
            blur ? this.input.blur() : this.input.focus();
        });
    };

    onHeaderPress = () => {
        this.focus();
    };

    onChangeValue = value => {
        this.setState({ valueData: value }, () => {
            this.props.onValueUpdate(value);
        });
    };

    blur = () => {
        this._animateInput({ blur: true });
    };

    focus = () => {
        this._animateInput({ blur: false });
    };

    render() {
        return (
            <View style={this._style()} {...this.id("input-animated")}>
                <Touchable activeOpacity={0.8} onPress={this.onHeaderPress}>
                    <Animated.View style={styles.header}>
                        {Boolean(this.props.header) && (
                            <Animated.View style={this._headerTextStyle()}>
                                <Animated.Text style={this._textStyle()}>
                                    {this.props.header}
                                </Animated.Text>
                            </Animated.View>
                        )}
                    </Animated.View>
                </Touchable>
                <Animated.View style={this._underlineStyle()} />
                <Animated.View style={this._inputStyle()}>
                    <Input
                        ref={el => (this.input = el)}
                        value={this.state.valueData}
                        placeholder={this.props.placeholder || this.props.header}
                        placeholderTextColor={"#869aaa"}
                        height={40}
                        showBorder={false}
                        padding={false}
                        onValueUpdate={this.onChangeValue}
                        onFocus={this._onFocus}
                        onBlur={this._onBlur}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputAnimated: {
        fontFamily: baseStyles.FONT_BOLD,
        maxHeight: 50
    },
    header: {
        height: 50,
        alignContent: "flex-end"
    },
    headerUnderline: {
        backgroundColor: "#c3c9cf",
        height: 1
    },
    headerText: {
        fontSize: 16,
        position: "absolute"
    },
    input: {
        borderBottomWidth: 1
    }
});

export default InputAnimated;
