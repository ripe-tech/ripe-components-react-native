import React, { PureComponent } from "react";
import { ViewPropTypes, TextInput } from "react-native";

import PropTypes from "prop-types";

export class TextArea extends PureComponent {
    static get propTypes() {
        return {
            value: PropTypes.string,
            placeholder: PropTypes.string,
            multiline: PropTypes.bool,
            minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            onValue: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            value: undefined,
            placeholder: undefined,
            multiline: false,
            minHeight: undefined,
            onValue: () => {},
            style: {}
        };
    }

    test = () => {
        return `${this.props.value}\n${this.props.placeholder}\n${this.props.multiline}\n${this.props.minHeight}`;
    };

    _style = () => {
        return [];
    };

    render() {
        return (
            <TextInput placeholder={this.props.placeholder} multiline={this.props.multiline}>
                {this.props.value}
            </TextInput>
        );
    }
}

export default TextArea;
