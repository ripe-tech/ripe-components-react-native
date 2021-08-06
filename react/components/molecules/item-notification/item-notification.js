import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { dateTimeString } from "ripe-commons-native";

import { Avatar, Touchable } from "../../atoms";

import { baseStyles } from "../../../util";

export class ItemNotification extends PureComponent {
    static get propTypes() {
        return {
            avatarURL: PropTypes.string,
            onPress: PropTypes.func,
            text: PropTypes.string,
            timestamp: PropTypes.number,
            unread: PropTypes.bool,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            unread: false,
            onPress: () => {},
            styles: styles
        };
    }

    _style() {
        return [
            styles.style,
            {
                backgroundColor: this.props.unread ? "#e5ebfd" : "#ffffff"
            }
        ];
    }

    render() {
        return (
            <Touchable style={this._style()} onPress={this.props.onPress} activeOpacity={0.6}>
                <Avatar
                    image={{
                        uri: this.props.avatarURL
                    }}
                    size={52}
                    style={styles.avatar}
                />
                <Text style={styles.text}>{this.props.text}</Text>
                {this.props.timestamp ? (
                    <Text style={styles.timestamp}>{dateTimeString(this.props.timestamp)} </Text>
                ) : null}
            </Touchable>
        );
    }
}
const styles = StyleSheet.create({
    style: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderBottomColor: "#e4e8f0",
        borderBottomWidth: 2,
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 15,
        paddingLeft: 14,
        paddingTop: 19,
        paddingRight: 20
    },
    text: {
        flex: 1,
        fontSize: 16,
        marginLeft: 14,
        fontFamily: baseStyles.FONT,
        marginTop: Platform.OS === "ios" ? 2 : 0
    },
    timestamp: {
        color: "#a8b3bb",
        fontSize: 14,
        textAlign: "right",
        maxWidth: 80,
        fontFamily: baseStyles.FONT,
        marginTop: Platform.OS === "ios" ? 2 : 0
    }
});
