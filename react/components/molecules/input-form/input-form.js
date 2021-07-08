import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Input, TextArea, Touchable } from "../../atoms";

export class InputForm extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            label: PropTypes.string,
            placeholder: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
            valueData: this.props.value
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

    _onFocus = () => {
        this.props.onFocus();
    };

    _onBlur = () => {
        this.props.onBlur();
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
                        ref={el => (this.input = el)}
                        style={styles.inputTextarea}
                        value={this.state.valueData}
                        placeholder={this.props.label}
                        multiline={true}
                        backgroundColor={null}
                        paddingHorizontal={0}
                        fontSize={16}
                        onValue={this.onChangeValue}
                    />
                );
            default:
                return (
                    <Input
                        ref={el => (this.input = el)}
                        height={45}
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
                {this.props.children ? this.props.children : this._renderInput()}
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
        marginLeft: Platform.OS === "ios" ? 0 : 5,
        lineHeight: 20
    },
    inputTextarea: {
        marginLeft: Platform.OS === "ios" ? 0 : 5,
        marginBottom: 5
    }
});

export default InputForm;
