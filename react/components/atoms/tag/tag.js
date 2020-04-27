import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Platform, Text } from "react-native";
import PropTypes from "prop-types";

import { baseStyles, capitalize } from "../../../util";

import { Icon } from "../icon";
import { Touchable } from "../touchable";

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
            size: PropTypes.string,
            onPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            color: "#57626e",
            backgroundColor: "#eceef1",
            borderColor: undefined,
            text: undefined,
            icon: undefined,
            iconWidth: undefined,
            iconHeight: undefined,
            size: "normal",
            onPress: undefined,
            style: {}
        };
    }

    _hasBorder = () => {
        return this.props.borderColor && this.props.borderColor !== "transparent";
    };

    _style = () => {
        return [
            styles.tag,
            styles[`tag${capitalize(this.props.size)}`],
            {
                backgroundColor: this.props.backgroundColor,
                borderColor: this.props.borderColor,
                borderWidth: this._hasBorder() ? 1 : 0
            },
            this.props.style
        ];
    };

    _textStyle = () => {
        return [
            styles.text,
            styles[`text${capitalize(this.props.size)}`],
            {
                color: this.props.color,
                marginLeft: this.props.icon ? 8 : undefined
            }
        ];
    };

    render() {
        return (
            <Touchable
                style={this._style()}
                onPress={this.props.onPress}
                disabled={!this.props.onPress}
            >
                {this.props.icon ? (
                    <Icon
                        icon={this.props.icon}
                        color={this.props.color}
                        width={this.props.iconWidth}
                        height={this.props.iconHeight}
                    />
                ) : null}
                {this.props.text ? <Text style={this._textStyle()}>{this.props.text}</Text> : null}
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    tag: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6
    },
    tagTiny: {
        paddingVertical: 3,
        paddingHorizontal: 8
    },
    text: {
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: 11,
        lineHeight: 11,
        marginTop: Platform.OS === "ios" ? 2 : 0,
        letterSpacing: 0.25
    },
    textLarge: {
        fontSize: 13,
        lineHeight: 13
    },
    textTiny: {
        fontSize: 9,
        lineHeight: 9
    }
});

export default Tag;
