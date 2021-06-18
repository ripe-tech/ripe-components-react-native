import React, { PureComponent } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

export class Input extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            placeholder: PropTypes.string,
            value: PropTypes.string,
            showBorder: PropTypes.bool,
            padding: PropTypes.bool,
            borderColor: PropTypes.string,
            height: PropTypes.number,
            onValueUpdate: PropTypes.func,
            onFocus: PropTypes.func,
            onBlur: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            placeholder: undefined,
            value: undefined,
            showBorder: true,
            padding: true,
            borderColor: "#e4e8f0",
            height: undefined,
            onValueUpdate: value => {},
            onFocus: () => {},
            onBlur: () => {}
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
            this.setState({
                valueData: this.props.value
            });
        }
    }

    onChangeValue = value => {
        this.setState({ valueData: value }, () => {
            this.props.onValueUpdate(value);
        });
    };

    focus = () => {
        this.textInputComponent.focus();
    };

    blur = () => {
        this.textInputComponent.blur();
    };

    _style = () => {
        return [
            styles.input,
            {
                borderColor: this.props.showBorder ? "#e4e8f0" : "transparent",
                borderBottomWidth: this.props.showBorder ? 1 : 0,
                borderTopWidth: this.props.showBorder ? 1 : 0,
                padding: this.props.padding ? 15 : 0
            }
        ];
    };

    _styleTextInput = () => {
        return [
            styles.textInput,
            {
                height: this.props.height ? this.props.height : "100%"
            }
        ];
    };

    render() {
        return (
            <View style={this._style()} {...this.id("input-ripe")}>
                <TextInput
                    ref={el => (this.textInputComponent = el)}
                    style={this._styleTextInput()}
                    value={this.state.valueData}
                    placeholder={this.props.placeholder || this.props.header}
                    placeholderTextColor={"#869aaa"}
                    onChangeText={this.onChangeValue}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        fontFamily: baseStyles.FONT,
        display: "flex",
        flexDirection: "column",
        padding: 15
    },
    textInput: {
        fontSize: 16,
        height: 30,
        width: "100%",
        color: "#223645",
        letterSpacing: 0.8
    }
});

export default Input;
