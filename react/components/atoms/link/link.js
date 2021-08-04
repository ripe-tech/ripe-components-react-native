import React, { PureComponent } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class Link extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            url: PropTypes.string,
            onPress: PropTypes.func,
            color: PropTypes.string,
            styleText: Text.propTypes.style,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            url: undefined,
            onPress: undefined,
            color: undefined,
            styleText: {},
            style: {},
            styles: styles
        };
    }

    _colorToHex(color) {
        switch (color) {
            case "blue":
                return "#597cf0";
            default:
                return "#1d2631";
        }
    }

    onLinkPress = event => {
        if (this.props.url) {
            Linking.openURL(this.props.url);
        } else if (this.props.onPress) {
            this.props.onPress(event);
        }
    };

    _textStyle = () => {
        console.log(this.props.styles);
        return [
            this.props.styles.text,
            { color: this._colorToHex(this.props.color) },
            this.props.styleText
        ];
    };

    render() {
        return (
            <TouchableOpacity
                style={this.props.style}
                activeOpacity={0.4}
                onPress={() => this.onLinkPress()}
            >
                <Text style={this._textStyle()}>
                    {this.props.text ? this.props.text : this.props.url}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        textDecorationLine: "underline",
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: baseStyles.FONT_SIZE
    }
});

export const linkStyles = styles;

export default Link;
