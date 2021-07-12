import React, { PureComponent } from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { Avatar, Icon } from "../../atoms";
import { Item } from "../../molecules";

import { baseStyles, capitalize } from "../../../util";

export class Card extends PureComponent {
    static get propTypes() {
        return {
            avatarURL: PropTypes.string,
            icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            iconColor: PropTypes.string,
            iconFill: PropTypes.string,
            shapeVariant: PropTypes.string,
            title: PropTypes.string,
            text: PropTypes.string,
            subText: PropTypes.string,
            pressable: PropTypes.bool,
            itemProps: PropTypes.object,
            onPress: PropTypes.func,
            onLongPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            shapeVariant: "round",
            pressable: true,
            itemProps: {},
            onPress: () => {},
            onLongPress: () => {},
            style: {}
        };
    }

    _style = () => {
        return [
            styles.style,
            styles[`card${capitalize(this.props.shapeVariant)}`],
            this.props.style
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
                {this.props.title ? (
                    <Text numberOfLines={1} style={styles.title}>
                        {this.props.title}
                    </Text>
                ) : null}
                {this.props.text ? (
                    <Text numberOfLines={2} style={styles.text}>
                        {this.props.text}
                    </Text>
                ) : null}
                {this.props.subtext ? (
                    <Text numberOfLines={1} style={styles.text}>
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
                contentStyle={styles.contentStyle}
                variant={this.props.shapeVariant}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                activeOpacity={0.6}
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
        alignItems: "center",
        backgroundColor: "#ffffff",
        flexDirection: "row",
        height: 100,
        shadowColor: "#435764",
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        overflow: "hidden",
        paddingBottom: 20,
        paddingLeft: 25,
        paddingTop: 20,
        paddingRight: 20,
        width: "100%"
    },
    contentStyle: {
        flexDirection: "row",
        overflow: "visible",
        borderRadius: 0,
        backgroundColor: "transparent",
        shadowOffset: {},
        elevation: 0,
        shadowRadius: 0,
        shadowColor: null,
        shadowOpacity: null
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
        fontSize: 14,
        color: "#C3C9CF"
    }
});
