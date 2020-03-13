import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { Avatar } from "../../atoms/avatar";
import { dateTimeString } from "../../../util";

export class ItemNotification extends PureComponent {
    static get propTypes() {
        return {
            avatarURL: PropTypes.String,
            onPress: PropTypes.func,
            text: PropTypes.String,
            timestamp: PropTypes.Number,
            unread: PropTypes.bool
        };
    }

    static get defaultProps() {
        return {
            onPress: () => {},
            text: undefined,
            unread: false
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
            <TouchableOpacity
                style={this._style()}
                onPress={this.props.onPress}
                activeOpacity={0.6}
            >
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
            </TouchableOpacity>
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
        height: 86,
        justifyContent: "center",
        paddingBottom: 15,
        paddingLeft: 14,
        paddingTop: 19,
        paddingRight: 20
    },
    text: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 14
    },
    timestamp: {
        color: "#a8b3bb",
        fontSize: 14,
        textAlign: "center",
        maxWidth: 80
    }
});
