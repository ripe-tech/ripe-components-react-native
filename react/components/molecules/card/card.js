import React, { PureComponent } from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { Avatar, Icon, Touchable } from "../../atoms";

import { baseStyles } from "../../../util";

export class Card extends PureComponent {
    static get propTypes() {
        return {
            avatarURL: PropTypes.String,
            icon: PropTypes.String,
            iconColor: PropTypes.String,
            iconFill: PropTypes.String,
            title: PropTypes.String,
            text: PropTypes.String,
            subText: PropTypes.String,
            style: ViewPropTypes.style,
            pressable: PropTypes.bool,
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            title: undefined,
            text: undefined,
            subText: undefined,
            style: {},
            pressable: true,
            onPress: () => {}
        };
    }

    _avatarStyle() {
        return {
            ...styles.avatar,
            ...this.props.style?.image
        };
    }

    _textStyle() {
        return {
            ...styles.text,
            ...this.props.style?.text
        };
    }

    _renderCardImageAvatar() {
        return (
            <Avatar
                image={{
                    uri: this.props.avatarURL
                }}
                size={60}
                style={this._avatarStyle()}
            />
        );
    }

    _renderCardImageIcon() {
        return (
            <Icon
                icon={this.props.icon}
                color={this.props.iconColor}
                fill={this.props.iconFill}
                height={60}
                width={60}
            />
        );
    }

    _renderCardImage() {
        if (this.props.icon) return this._renderCardImageIcon();
        if (this.props.avatarURL) return this._renderCardImageAvatar();
    }

    _renderCardText() {
        return (
            <View style={styles.textContainer}>
                {this.props.title ? <Text style={styles.title}>{this.props.title}</Text> : null}
                {this.props.text ? <Text style={styles.text}>{this.props.text}</Text> : null}
                {this.props.subtext ? <Text style={styles.text}>{this.props.subtext}</Text> : null}
            </View>
        );
    }

    render() {
        return (
            <Touchable style={styles.style} onPress={this.props.onPress} activeOpacity={0.6}>
                {this.props.children ? (
                    this.props.children
                ) : (
                    <>
                        {this._renderCardImage()}
                        {this._renderCardText()}
                    </>
                )}
            </Touchable>
        );
    }
}
const styles = StyleSheet.create({
    style: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 6,
        flexDirection: "row",
        height: 100,
        shadowColor: "#435764",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        paddingBottom: 20,
        paddingLeft: 25,
        paddingTop: 20,
        paddingRight: 20,
        width: "100%"
    },
    avatar: {
        marginRight: 20
    },
    textContainer: {
        fontFamily: baseStyles.FONT,
        height: 65,
        justifyContent: "space-around"
    },
    title: {
        fontSize: 18
    },
    text: {
        fontSize: 14,
        color: "#C3C9CF"
    }
});
