import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Text, View } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class Badge extends PureComponent {
    static get propTypes() {
        return {
            backgroundColor: PropTypes.string,
            borderRadius: PropTypes.number,
            color: PropTypes.string,
            height: PropTypes.number,
            style: ViewPropTypes.style,
            text: PropTypes.string,
            width: PropTypes.number
        };
    }

    static get defaultProps() {
        return {
            backgroundColor: "#597cf0",
            borderRadius: 8,
            color: "#ffffff",
            height: 16,
            style: {},
            text: undefined,
            width: 22
        };
    }

    _style = () => {
        return [
            styles.badge,
            {
                backgroundColor: this.props.backgroundColor,
                borderRadius: this.props.borderRadius,
                height: this.props.height,
                width: this.props.width
            },
            this.props.style
        ];
    };

    _textStyle = () => {
        return [
            styles.text,
            {
                color: this.props.color,
                lineHeight: this.props.height + 1
            }
        ];
    };

    render() {
        return (
            <View style={this._style()} disabled={this.props.disabled}>
                {this.props.text ? <Text style={this._textStyle()}>{this.props.text}</Text> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: baseStyles.FONT_BOLD,
        textAlign: "center",
        fontWeight: "400",
        width: "100%",
        height: "100%",
        fontSize: 13
    }
});

export default Badge;
