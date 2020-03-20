import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Text, TouchableOpacity, Linking } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class Link extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            url: PropTypes.string.isRequired,
            onPress: PropTypes.func,
            color: PropTypes.string,
            styleText: Text.propTypes.style,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            url: undefined,
            onPress: undefined,
            color: undefined,
            styleText: {},
            style: {}
        };
    }

    _colorToHex(color) {
        switch (color) {
            case "blue":
                return "#597cf0";
            default:
                return color;
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
        return [styles.text, { color: this._colorToHex(this.props.color) }, this.props.styleText];
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
        color: "#1d2631",
        textDecorationLine: "underline",
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: baseStyles.FONT_SIZE
    }
});

export default Link;
