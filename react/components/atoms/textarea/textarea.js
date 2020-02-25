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

    _style = () => {
        const verticalPadding = this.props.multiline ? 20 : undefined;

        return [
            this.props.style,
            {
                minHeight: this.props.minHeight,
                paddingStart: 15,
                paddingEnd: 15,
                paddingTop: verticalPadding,
                paddingBottom: verticalPadding,
                color: "#3e566a"
            }
        ];
    };

    render() {
        return (
            <TextInput
                style={this._style()}
                placeholder={this.props.placeholder}
                multiline={this.props.multiline}
                onChangeText={this.props.onValue}
            >
                {this.props.value}
            </TextInput>
        );
    }
}

export default TextArea;
