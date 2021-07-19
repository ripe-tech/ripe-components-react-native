import React, { PureComponent } from "react";
import { Platform, StyleSheet, TextInput, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { capitalize } from "ripe-commons-native";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

export class TextArea extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            value: PropTypes.string,
            placeholder: PropTypes.string,
            multiline: PropTypes.bool,
            minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            backgroundColor: PropTypes.string,
            paddingHorizontal: PropTypes.number,
            fontSize: PropTypes.number,
            onSubmit: PropTypes.func,
            color: PropTypes.string,
            variant: PropTypes.string,
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
            backgroundColor: "#ffffff",
            paddingHorizontal: 15,
            fontSize: 14,
            color: undefined,
            variant: undefined,
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
            {
                minHeight: this.props.minHeight,
                maxHeight: this.props.maxHeight,
                backgroundColor: this.props.backgroundColor,
                paddingHorizontal: this.props.paddingHorizontal,
                fontSize: this.props.fontSize
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
                {...this.id("textarea")}
            >
                {this.props.value}
            </TextInput>
        );
    }
}

const styles = StyleSheet.create({
    textArea: {
        paddingTop: Platform.OS === "ios" ? 16 : 4,
        paddingBottom: Platform.OS === "ios" ? 12 : 4,
        color: "#3e566a",
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
