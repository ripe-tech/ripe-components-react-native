import React, { PureComponent } from "react";
import { ViewPropTypes, Text, TouchableOpacity, Linking } from "react-native";

import PropTypes from "prop-types";

export class Link extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            url: PropTypes.string.isRequired,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            url: undefined,
            style: {}
        };
    }

    onLinkPress = () => {
        Linking.openURL(this.props.url);
    };

    _style = () => {
        return [
            this.props.style,
            {
                color: "#1d2631",
                textDecorationLine: "underline"
            }
        ];
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

export default Link;
