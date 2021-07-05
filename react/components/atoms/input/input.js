import React, { PureComponent } from "react";
import { StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

export class Input extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            placeholder: PropTypes.string,
            value: PropTypes.string,
            placeholderTextColor: PropTypes.string,
            height: PropTypes.number,
            secureTextEntry: PropTypes.bool,
            onValueUpdate: PropTypes.func,
            onFocus: PropTypes.func,
            onBlur: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            placeholder: undefined,
            value: undefined,
            placeholderTextColor: "#869aaa",
            height: 30,
            secureTextEntry: false,
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
                height: this.props.height ? this.props.height : "100%"
            },
            this.props.style
        ];
    };

    render() {
        return (
            <TextInput
                ref={el => (this.textInputComponent = el)}
                style={this._style()}
                secureTextEntry={this.props.secureTextEntry}
                value={this.state.valueData}
                placeholder={this.props.placeholder || this.props.header}
                placeholderTextColor={this.props.placeholderTextColor}
                onChangeText={this.onChangeValue}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                {...this.id("input-ripe")}
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        fontFamily: baseStyles.FONT,
        fontSize: 16,
        width: "100%",
        color: "#223645",
        letterSpacing: 0.8
    }
});

export default Input;
