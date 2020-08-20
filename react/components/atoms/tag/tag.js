import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Platform, Text } from "react-native";
import PropTypes from "prop-types";

import { baseStyles, capitalize, testId } from "../../../util";

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
            style: ViewPropTypes.style,
            testId: PropTypes.string
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
            style: {},
            testId: undefined
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
                        {...testId(this.props.testId || `tag-icon-${this.props.icon}`)}
                    />
                ) : null}
                {this.props.text ? <Text style={this._textStyle()} {...testId(this.props.testId || `tag-text-${this.props.text}`)}>{this.props.text}</Text> : null}
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
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6
    },
    tagSmall: {
        paddingVertical: 4,
        paddingHorizontal: 10
    },
    tagTiny: {
        paddingVertical: 3,
        paddingHorizontal: 8
    },
    text: {
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: 11,
        letterSpacing: 0.25,
        marginTop: Platform.OS === "ios" ? 3 : 0
    },
    textLarge: {
        fontSize: 13,
        marginTop: Platform.OS === "ios" ? 3 : 0
    },
    textSmall: {
        fontSize: 10,
        marginTop: Platform.OS === "ios" ? 3 : 0
    },
    textTiny: {
        fontSize: 9,
        marginTop: Platform.OS === "ios" ? 2 : 0
    }
});

export default Tag;
