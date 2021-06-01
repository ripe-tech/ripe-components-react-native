import React, { PureComponent } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

export class InputRipe extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            header: PropTypes.string,
            placeholder: PropTypes.string,
            value: PropTypes.string,
            hasBorder: PropTypes.bool,
            borderColor: PropTypes.string,
            onValueUpdate: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            placeholder: this.props.header,
            borderColor: "#e4e8f0",
            header: undefined,
            value: undefined,
            hasBorder: undefined,
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
            this.onChangeValue(this.props.value);
        }
    }

    onChangeValue = value => {
        this.setState({ valueData: value }, () => {
            if (this.props.onValueUpdate) this.props.onValueUpdate(value);
        });
    };

    _style = () => {
        return [
            styles.container,
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
                    onChangeText={changedText => this.onChangeValue(changedText)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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

export default InputRipe;
