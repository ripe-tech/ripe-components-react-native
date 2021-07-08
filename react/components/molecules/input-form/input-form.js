import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
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
                        style={styles.input}
                        height={20}
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
            <View style={this._style()}>
                <Touchable
                    style={styles.inputTouchable}
                    activeOpacity={0.8}
                    onPress={this.onHeaderPress}
                    {...this.id("input-form")}
                >
                    <Text style={styles.text}>{this.props.label}</Text>
                    {this.props.children ? this.props.children : this._renderInput()}
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputForm: {
        flex: 1,
        flexDirection: "row"
    },
    inputTouchable: {
        flex: 1,
        paddingVertical: 16
    },
    text: {
        marginTop: Platform.OS === "ios" ? 2 : 0,
        marginBottom: Platform.OS === "ios" ? 6 : 5,
        marginLeft: Platform.OS === "ios" ? 0 : 5,
        fontFamily: baseStyles.FONT,
        fontSize: 14,
        color: "#4f7af8",
        lineHeight: 18
    },
    input: {
        margin: 0,
        marginLeft: Platform.OS === "ios" ? 0 : 5,
        paddingTop: 0,
        paddingBottom: 0,
        borderWidth: 0
    },
    inputTextarea: {
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: Platform.OS === "ios" ? 0 : 5,
        marginBottom: 0
    }
});

export default InputForm;
