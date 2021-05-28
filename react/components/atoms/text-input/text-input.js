import React, { PureComponent } from "react";
import { StyleSheet, Text, TextInput, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

export class TextInputRipe extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            title: PropTypes.string,
            placeholder: PropTypes.string,
            value: PropTypes.string,
            hasBorder: PropTypes.bool,
            borderColor: PropTypes.string,
            onValueUpdate: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            placeholder: "Insert value here",
            borderColor: "#e4e8f0",
            title: undefined,
            value: undefined,
            hasBorder: undefined,
            onValueUpdate: undefined
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.value
        };
    }

    _style = () => {
        return [
            styles.textInput,
            {
                borderColor: this.props.hasBorder ? "#e4e8f0" : "transparent",
                borderBottomWidth: this.props.hasBorder ? 1 : 0
            }
        ];
    };

    render() {
        return (
            <View style={this._style()} {...this.id("text-input-ripe")}>
                <Text style={styles.title}>{this.props.title}</Text>
                <TextInput
                    style={styles.input}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={"#869aa"}
                    onChangeText={changedText => {
                        this.setState({ text: changedText }, () => {
                            if (this.props.onValueUpdate) this.props.onValueUpdate(text);
                        });
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        fontFamily: baseStyles.FONT,
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 15
    },
    title: {
        fontSize: 12,
        color: "#4f7af8",
        letterSpacing: 0.6
    },
    input: {
        fontSize: 18,
        height: 30,
        width: "100%",
        color: "#223645",
        letterSpacing: 0.8
    }
});

export default TextInputRipe;
