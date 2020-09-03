import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, TextInput } from "react-native";
import PropTypes from "prop-types";

import { capitalize, baseStyles, genTestProps } from "../../../util";

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
            color: PropTypes.string,
            variant: PropTypes.string,
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
            color: undefined,
            variant: undefined,
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
            {
                minHeight: this.props.minHeight,
                maxHeight: this.props.maxHeight
            },
            styles[`textArea${capitalize(this.props.color)}`],
            styles[`textArea${capitalize(this.props.variant)}`],
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
                {...genTestProps(this.props.testPrefix, "textarea")}
            >
                {this.props.value}
            </TextInput>
        );
    }
}

const styles = StyleSheet.create({
    textArea: {
        paddingVertical: 4,
        paddingHorizontal: 15,
        color: "#3e566a",
        backgroundColor: "#ffffff",
        fontFamily: baseStyles.FONT
    },
    textAreaMultiline: {
        paddingVertical: 14
    },
    textAreaGrey: {
        backgroundColor: "#f6f7f9"
    }
});

export default TextArea;
