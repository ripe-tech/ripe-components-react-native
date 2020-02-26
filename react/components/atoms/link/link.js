import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Text, TouchableOpacity, Linking } from "react-native";

import PropTypes from "prop-types";

export class Link extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            url: PropTypes.string.isRequired,
            onPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            url: undefined,
            onPress: undefined,
            style: {}
        };
    }

    onLinkPress = event => {
        if (this.props.url) {
            Linking.openURL(this.props.url);
        } else if (this.props.onPress) {
            this.props.onPress(event);
        }
    };

    _style = () => {
        return [styles.link, this.props.style];
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={0.4} onPress={() => this.onLinkPress()}>
                <Text style={this._style()}>
                    {this.props.text ? this.props.text : this.props.url}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    link: {
        color: "#1d2631",
        textDecorationLine: "underline"
    }
});

export default Link;
