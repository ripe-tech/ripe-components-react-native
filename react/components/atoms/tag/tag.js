import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Platform, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

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
            style: ViewPropTypes.style,
            textStyle: ViewPropTypes.style,
            onPress: PropTypes.func
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
            style: {},
            textStyle: {},
            onPress: undefined
        };
    }

    _style = () => {
        return [
            styles.tag,
            {
                backgroundColor: this.props.backgroundColor,
                borderColor: this.props.borderColor,
                borderWidth: this.props.borderColor ? 1 : 0,
                borderRadius: this.props.borderColor ? 6 : 0
            },
            this.props.style
        ];
    };

    _textStyle = () => {
        return [
            styles.text,
            {
                color: this.props.color,
                marginLeft: this.props.icon ? 8 : undefined
            },
            this.props.textStyle
        ];
    };

    render() {
        return (
            <TouchableOpacity
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
            </TouchableOpacity>
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
        paddingHorizontal: 12
    },
    text: {
        fontFamily: baseStyles.FONT_REGULAR,
        fontSize: 13,
        marginTop: Platform.OS === "ios" ? 2 : 0
    }
});

export default Tag;
