import React, { PureComponent } from "react";
import { StyleSheet, Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Input, TextArea, Touchable } from "../../atoms";

export class InputForm extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            label: PropTypes.string,
            placeholder: PropTypes.string,
            value: PropTypes.string,
            meta: PropTypes.string,
            secureTextEntry: PropTypes.bool,
            onValueUpdate: PropTypes.func,
            onBlur: PropTypes.func,
            onFocus: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            label: undefined,
            placeholder: undefined,
            value: undefined,
            meta: undefined,
            secureTextEntry: false,
            onValueUpdate: value => {},
            onFocus: () => {},
            onBlur: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            valueData: this.props.value,
            focused: true
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

    blur = () => {
        this.input?.blur();
    };

    focus = () => {
        this.input?.focus();
    };

    onHeaderPress = () => {
        this.focus();
    };

    onChangeValue = value => {
        this.setState({ valueData: value }, () => {
            this.props.onValueUpdate(value);
        });
    };

    _style = () => {
        return [styles.inputForm, this.props.style];
    };

    _renderInput = () => {
        switch (this.props.meta) {
            case "long":
                return (
                    <TextArea
                        style={styles.inputTextarea}
                        value={this.state.valueData}
                        placeholder={this.props.label}
                        multiline={true}
                        backgroundColor={null}
                        paddingHorizontal={0}
                        onValue={this.onChangeValue}
                    />
                );
            default:
                return (
                    <Input
                        ref={el => (this.input = el)}
                        height={40}
                        type={this.props.meta}
                        value={this.state.valueData}
                        placeholder={this.props.label}
                        secureTextEntry={this.props.secureTextEntry}
                        onValueUpdate={this.onChangeValue}
                    />
                );
        }
    };

    render() {
        return (
            <Touchable
                style={this._style()}
                activeOpacity={0}
                onPress={this.onHeaderPress}
                {...this.id("input-form")}
            >
                <Text style={styles.text}>{this.props.label}</Text>
                {this._renderInput()}
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    inputForm: {
        flex: 1
    },
    text: {
        fontFamily: baseStyles.FONT,
        fontSize: 12,
        color: "#4f7af8",
        marginLeft: 5,
        lineHeight: 20
    },
    inputTextarea: {
        marginLeft: 5,
        fontSize: 14
    }
});

export default InputForm;
