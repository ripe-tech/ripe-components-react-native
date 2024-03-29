import React, { PureComponent } from "react";
import { Animated, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Input, Touchable } from "../../atoms";

export class InputAnimated extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            label: PropTypes.string,
            borderBottomActiveColor: PropTypes.string,
            placeholderTextColor: PropTypes.string,
            placeholder: PropTypes.string,
            value: PropTypes.string,
            secureTextEntry: PropTypes.bool,
            style: PropTypes.any,
            onValueUpdate: PropTypes.func,
            onBlur: PropTypes.func,
            onFocus: PropTypes.func,
            onSubmitEditing: PropTypes.func,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            label: undefined,
            borderBottomActiveColor: "#4f7af8",
            placeholderTextColor: "#869aaa",
            placeholder: undefined,
            value: undefined,
            secureTextEntry: false,
            style: {},
            onValueUpdate: value => {},
            onFocus: () => {},
            onBlur: () => {},
            onSubmitEditing: event => {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.animationDuration = 250;

        this.labelTextYPositionBlur = 5;
        this.labelTextYPositionFocus = 30;

        this.textFontSizeBlur = 16;
        this.textFontSizeFocus = 12;

        this.labelTextColorBlur = 0;
        this.labelTextColorFocus = 1;

        this.underlineOpacityBlur = 1;
        this.underlineOpacityFocus = 0;

        this.underlineYTransformBlur = 0;
        this.underlineYTransformFocus = -20;

        this.inputBorderOpacityBlur = 0;
        this.inputBorderOpacityFocus = 1;

        this.inputYMarginTopBlur = 0;
        this.inputYMarginTopFocus = -35;

        this.state = {
            valueData: this.props.value,
            focused: true,
            labelTextYPosition: new Animated.Value(this.labelTextYPositionBlur),
            textFontSize: new Animated.Value(this.textFontSizeBlur),
            labelTextColor: new Animated.Value(this.labelTextColorBlur),
            underlineOpacity: new Animated.Value(this.underlineOpacityBlur),
            underlineYTransform: new Animated.Value(this.underlineYTransformBlur),
            inputBorderOpacity: new Animated.Value(this.inputBorderOpacityBlur),
            inputYMarginTop: new Animated.Value(this.inputYMarginTopBlur)
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

    _labelTextStyle = () => {
        return [
            styles.labelText,
            {
                bottom: this.state.labelTextYPosition
            }
        ];
    };

    _textStyle = () => {
        return [
            {
                color: this.state.labelTextColor.interpolate({
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
                marginTop: this.state.inputYMarginTop,
                opacity: this.state.inputBorderOpacity
            }
        ];
    };

    _style = () => {
        return [styles.inputAnimated, this.props.style];
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
            Animated.timing(this.state.labelTextYPosition, {
                toValue: blur ? this.labelTextYPositionBlur : this.labelTextYPositionFocus,
                duration: this.animationDuration,
                useNativeDriver: false
            }),
            Animated.timing(this.state.labelTextColor, {
                toValue: blur ? this.labelTextColorBlur : this.labelTextColorFocus,
                duration: this.animationDuration,
                useNativeDriver: false
            }),
            Animated.timing(this.state.textFontSize, {
                toValue: blur ? this.textFontSizeBlur : this.textFontSizeFocus,
                duration: this.animationDuration,
                useNativeDriver: false
            }),
            Animated.timing(this.state.underlineOpacity, {
                toValue: blur ? this.underlineOpacityBlur : this.underlineOpacityFocus,
                duration: this.animationDuration,
                useNativeDriver: false
            }),
            Animated.timing(this.state.underlineYTransform, {
                toValue: blur ? this.underlineYTransformBlur : this.underlineYTransformFocus,
                duration: this.animationDuration,
                useNativeDriver: false
            }),
            Animated.timing(this.state.inputBorderOpacity, {
                toValue: blur ? this.inputBorderOpacityBlur : this.inputBorderOpacityFocus,
                duration: this.animationDuration,
                useNativeDriver: false
            }),
            Animated.timing(this.state.inputYMarginTop, {
                toValue: blur ? this.inputYMarginTopBlur : this.inputYMarginTopFocus,
                duration: this.animationDuration,
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
            <Touchable
                style={this._style()}
                activeOpacity={0.8}
                onPress={this.onHeaderPress}
                {...this.id("input-animated")}
            >
                <Animated.View style={styles.header}>
                    {Boolean(this.props.label) && (
                        <Animated.View style={this._labelTextStyle()}>
                            <Animated.Text style={this._textStyle()}>
                                {this.props.label}
                            </Animated.Text>
                        </Animated.View>
                    )}
                </Animated.View>
                <Animated.View style={this._underlineStyle()} />
                <Animated.View style={this._inputStyle()}>
                    <Input
                        style={styles.inputComponent}
                        ref={el => (this.input = el)}
                        value={this.state.valueData}
                        placeholder={this.props.placeholder || this.props.label}
                        placeholderTextColor={this.props.placeholderTextColor}
                        height={40}
                        secureTextEntry={this.props.secureTextEntry}
                        onValueUpdate={this.onChangeValue}
                        onFocus={this._onFocus}
                        onBlur={this._onBlur}
                        onSubmitEditing={this.props.onSubmitEditing}
                    />
                </Animated.View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    inputAnimated: {
        maxHeight: 50
    },
    header: {
        fontFamily: baseStyles.FONT_BOLD,
        height: 50,
        alignContent: "flex-end"
    },
    headerUnderline: {
        backgroundColor: "#c3c9cf",
        height: 1
    },
    labelText: {
        fontSize: 16,
        position: "absolute"
    },
    input: {
        fontFamily: baseStyles.FONT_BOLD,
        borderBottomWidth: 1
    },
    inputComponent: {
        paddingVertical: 10
    }
});

export default InputAnimated;
