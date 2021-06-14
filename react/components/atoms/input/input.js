import React, { PureComponent } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

export class Input extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            header: PropTypes.string,
            placeholder: PropTypes.string,
            value: PropTypes.string,
            showBorder: PropTypes.bool,
            borderColor: PropTypes.string,
            onValueUpdate: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            placeholder: undefined,
            borderColor: "#e4e8f0",
            header: undefined,
            value: undefined,
            showBorder: true,
            onValueUpdate: undefined
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
            if (this.props.onValueUpdate) this.props.onValueUpdate(value);
        });
    };

    _style = () => {
        return [
            styles.input,
            {
                borderColor: this.props.showBorder ? "#e4e8f0" : "transparent",
                borderBottomWidth: this.props.showBorder ? 1 : 0,
                borderTopWidth: this.props.showBorder ? 1 : 0
            }
        ];
    };

    render() {
        return (
            <View style={this._style()} {...this.id("input-ripe")}>
                {Boolean(this.props.header) && (
                    <Text style={styles.header}>{this.props.header}</Text>
                )}
                <TextInput
                    style={styles.textInput}
                    value={this.state.valueData}
                    placeholder={this.props.placeholder || this.props.header}
                    placeholderTextColor={"#869aaa"}
                    onChangeText={this.onChangeValue}
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
    header: {
        fontSize: 12,
        color: "#4f7af8",
        letterSpacing: 0.6
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
