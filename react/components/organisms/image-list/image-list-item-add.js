import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Platform, TouchableOpacity, Text, View } from "react-native";
import PropTypes from "prop-types";

import { Icon } from "../../atoms";

import { baseStyles } from "../../../util";

export class ImageListItemAdd extends PureComponent {
    static get propTypes() {
        return {
            backgroundColor: PropTypes.string,
            borderColor: PropTypes.string,
            icon: PropTypes.string.isRequired,
            iconColor: PropTypes.string,
            iconHeight: PropTypes.number,
            iconWidth: PropTypes.number,
            iconStrokeWidth: PropTypes.number,
            onPress: PropTypes.func,
            text: PropTypes.string,
            textColor: PropTypes.string,
            size: PropTypes.number.isRequired,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            backgroundColor: "#ffffff",
            borderColor: null,
            iconColor: "#000000",
            iconHeight: 20,
            iconWidth: 20,
            iconStrokeWidth: 1,
            onPress: undefined,
            text: undefined,
            textColor: "#a4adb5",
            style: {}
        };
    }

    _style() {
        return [
            styles.buttonIcon,
            {
                borderColor: this.props.borderColor,
                borderRadius: this.props.borderColor ? 6 : 0,
                borderWidth: this.props.borderColor ? 1 : 0,
                backgroundColor: this.props.backgroundColor,
                width: this.props.size,
                height: this.props.size
            },
            this.props.style
        ];
    }

    _textStyles() {
        return [
            styles.text,
            {
                color: this.props.textColor
            }
        ];
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                disabled={!this.props.onPress}
                style={this._style()}
            >
                {this.props.icon ? (
                    <View style={styles.container}>
                        <Icon
                            icon={this.props.icon}
                            color={this.props.iconColor}
                            width={this.props.iconWidth}
                            height={this.props.iconHeight}
                            strokeWidth={this.props.iconStrokeWidth}
                        />
                    </View>
                ) : null}
                {this.props.text ? <Text style={this._textStyles()}>{this.props.text}</Text> : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonIcon: {
        paddingHorizontal: 6,
        paddingVertical: 10
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontFamily: baseStyles.FONT,
        marginTop: Platform.OS === "ios" ? 4 : 0,
        fontSize: 12,
        letterSpacing: 0.5,
        textAlign: "center"
    }
});
