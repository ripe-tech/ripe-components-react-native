import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, TextInput } from "react-native";

import PropTypes from "prop-types";

export class TextArea extends PureComponent {
    static get propTypes() {
        return {
            value: PropTypes.string,
            placeholder: PropTypes.string,
            multiline: PropTypes.bool,
            minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            onSubmit: PropTypes.func,
            onValue: PropTypes.func,
            onFocus: PropTypes.func,
            onBlur: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            value: undefined,
            placeholder: undefined,
            multiline: false,
            minHeight: undefined,
            maxHeight: undefined,
            onSubmit: () => {},
            onValue: () => {},
            onFocus: () => {},
            onBlur: () => {},
            style: {}
        };
    }

    focus() {
        this.textInputComponent.focus();
    }

    blur() {
        this.textInputComponent.blur();
    }

    onSubmit = event => {
        if (!this.props.multiline) this.props.onSubmit(event);
    };

    _style = () => {
        return [
            styles.textArea,
            this.props.multiline ? styles.textAreaMultiline : {},
            {
                minHeight: this.props.minHeight,
                maxHeight: this.props.maxHeight
            },
            this.props.style
        ];
    };

    render() {
        return (
            <TextInput
                ref={el => (this.textInputComponent = el)}
                style={this._style()}
                placeholder={this.props.placeholder}
                multiline={this.props.multiline}
                onSubmitEditing={this.onSubmit}
                onChangeText={this.props.onValue}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
            >
                {this.props.value}
            </TextInput>
        );
    }
}

const styles = StyleSheet.create({
    textArea: {
        paddingVertical: 0,
        paddingHorizontal: 15,
        color: "#3e566a",
        backgroundColor: "#ffffff"
    },
    textAreaMultiline: {
        paddingVertical: 14
    }
});

export default TextArea;
