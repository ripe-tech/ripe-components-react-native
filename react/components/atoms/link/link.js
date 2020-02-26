import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, Linking } from "react-native";

import PropTypes from "prop-types";

export class Link extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            url: PropTypes.string.isRequired
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            url: undefined
        };
    }

    onLinkPress = () => {
        Linking.openURL(this.props.url);
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={0.4} onPress={() => this.onLinkPress()}>
                <Text style={styles.text}>
                    {this.props.text ? this.props.text : this.props.url}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: "#1d2631",
        textDecorationLine: "underline"
    }
});

export default Link;
