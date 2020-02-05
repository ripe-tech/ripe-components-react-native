import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import PropTypes from "prop-types";

import * as baseStyles from "../../../util/styles";

import { Icon } from "../icon";

export class Tag extends PureComponent {
    static get propTypes() {
        return {
            color: PropTypes.string,
            backgroundColor: PropTypes.string,
            borderColor: PropTypes.string,
            text: PropTypes.string,
            icon: PropTypes.string,
            iconWidth: PropTypes.number,
            iconHeight: PropTypes.number,
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            color: "#57626e",
            backgroundColor: "#eceef1",
            borderColor: "red",
            text: undefined,
            icon: undefined,
            iconWidth: undefined,
            iconHeight: undefined,
            onPress: () => {}
        };
    }

    _style = () => {
        return Object.assign({}, styles.style, {
            backgroundColor: this.props.backgroundColor,
            borderColor: this.props.borderColor
        });
    };

    _textStyle = () => {
        return Object.assign({}, styles.text, {
            color: this.props.color,
            marginLeft: this.props.icon ? 8 : undefined
        });
    };

    render() {
        return (
            <TouchableOpacity style={this._style()} onPress={this.props.onPress}>
                {this.props.icon ? (
                    <Icon
                        icon={this.props.icon}
                        color={this.props.color}
                        width={this.props.iconWidth}
                        height={this.props.iconHeight}
                    />
                ) : null}
                {this.props.text ? <Text style={this._textStyle()}>{this.props.text}</Text> : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    style: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 6,
        borderColor: "red",
        borderWidth: 0
    },
    text: {
        fontFamily: baseStyles.FONT_REGULAR,
        fontSize: 13,
        marginTop: Platform.OS === "ios" ? 2 : 0
    }
});
