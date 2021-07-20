import React, { PureComponent } from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { capitalize } from "ripe-commons-native";

import { Avatar } from "../../atoms/avatar";
import { Icon } from "../../atoms";
import { Item } from "../item";

import { baseStyles } from "../../../util";

export class Card extends PureComponent {
    static get propTypes() {
        return {
            avatarURL: PropTypes.string,
            disabled: PropTypes.bool,
            icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            iconColor: PropTypes.string,
            iconFill: PropTypes.string,
            iconStrokeWidth: PropTypes.number,
            shapeVariant: PropTypes.string,
            title: PropTypes.string,
            text: PropTypes.string,
            subText: PropTypes.string,
            pressable: PropTypes.bool,
            itemProps: PropTypes.object,
            onPress: PropTypes.func,
            onLongPress: PropTypes.func,
            contentStyle: ViewPropTypes.style,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            disabled: false,
            shapeVariant: "round",
            pressable: true,
            itemProps: {},
            onPress: () => {},
            onLongPress: () => {},
            contentStyle: {},
            style: {}
        };
    }

    _style = () => {
        return [styles.style, this.props.style];
    };

    _contentStyle = () => {
        return [
            styles.contentStyle,
            styles[`card${capitalize(this.props.shapeVariant)}`],
            this.props.contentStyle
        ];
    };

    _avatarStyle() {
        return {
            ...styles.avatar,
            ...this.props.style?.avatar
        };
    }

    _iconStyle() {
        return {
            ...styles.avatar,
            ...this.props.style?.icon
        };
    }

    _textStyle() {
        return {
            ...styles.text,
            height: this.props.subtext ? undefined : 35,
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
                style={this._iconStyle()}
                icon={this.props.icon}
                strokeWidth={this.props.iconStrokeWidth}
                color={this.props.iconColor}
                fill={this.props.iconFill}
                height={45}
                width={45}
            />
        );
    }

    _renderCardImage() {
        if (!this.props.icon && !this.props.avatarURL) return null;

        if (this.props.icon) return this._renderCardImageIcon();
        if (this.props.avatarURL) return this._renderCardImageAvatar();
    }

    _renderCardText() {
        if (!this.props.title && !this.props.text && !this.props.subtext) return null;

        return (
            <View style={styles.textContainer}>
                {this.props.title ? (
                    <Text numberOfLines={1} style={styles.title}>
                        {this.props.title}
                    </Text>
                ) : null}
                {this.props.text ? (
                    <Text numberOfLines={2} style={this._textStyle()}>
                        {this.props.text}
                    </Text>
                ) : null}
                {this.props.subtext ? (
                    <Text numberOfLines={1} style={this._textStyle()}>
                        {this.props.subtext}
                    </Text>
                ) : null}
            </View>
        );
    }

    render() {
        return (
            <Item
                style={this._style()}
                contentStyle={this._contentStyle()}
                variant={this.props.shapeVariant}
                activeOpacity={0.6}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                {...this.props.itemProps}
            >
                {this.props.children ? (
                    this.props.children
                ) : (
                    <>
                        {this._renderCardImage()}
                        {this._renderCardText()}
                    </>
                )}
            </Item>
        );
    }
}
const styles = StyleSheet.create({
    style: {
        paddingHorizontal: 0
    },
    contentStyle: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        flexDirection: "row",
        height: 100,
        shadowColor: "#435764",
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        paddingBottom: 20,
        paddingLeft: 25,
        paddingTop: 20,
        paddingRight: 20,
        width: "100%"
    },
    cardSquare: {
        borderRadius: 0
    },
    cardRound: {
        borderRadius: 6
    },
    avatar: {
        marginRight: 20
    },
    icon: {
        marginRight: 20
    },
    textContainer: {
        fontFamily: baseStyles.FONT,
        height: 65,
        justifyContent: "space-around",
        flexShrink: 1
    },
    title: {
        fontSize: 18
    },
    text: {
        color: "#c3c9cf",
        fontSize: 14
    }
});
