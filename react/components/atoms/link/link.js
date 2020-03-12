import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Text, TouchableOpacity, Linking } from "react-native";
import PropTypes from "prop-types";

export class Link extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            url: PropTypes.string.isRequired,
            onPress: PropTypes.func,
            color: PropTypes.string,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            url: undefined,
            onPress: undefined,
            color: undefined,
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

    _style = () => {
        return [styles.text, { color: this._colorToHex(this.props.color) }];
    };

    render() {
        return (
            <TouchableOpacity
                style={this.props.style}
                activeOpacity={0.4}
                onPress={() => this.onLinkPress()}
            >
                <Text style={this._style()}>
                    {this.props.text ? this.props.text : this.props.url}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: "#1d2631",
        fontWeight: "bold",
        textDecorationLine: "underline"
    }
});

export default Link;
