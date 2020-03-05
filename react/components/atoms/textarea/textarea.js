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

    _style = () => {
        return [
            styles.textArea,
            {
                paddingVertical: this.props.multiline ? 20 : 0,
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
        paddingLeft: 15,
        paddingRight: 15,
        color: "#3e566a"
    }
});

export default TextArea;
