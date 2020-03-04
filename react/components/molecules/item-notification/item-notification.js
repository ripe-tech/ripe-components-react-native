import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { Avatar } from "../../atoms/avatar";
import { timeStringUTC } from "../../../util";

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
            onPress: undefined,
            text: null,
            unread: false
        };
    }

    _style() {
        return [
            styles.style,
            {
                backgroundColor: this.props.unread ? "#e5ebfd" : "#fff"
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
                <Text style={styles.timestamp}>{timeStringUTC(this.props.timestamp)}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    style: {
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomColor: "#e4e8f0",
        borderBottomWidth: 2,
        flexDirection: "row",
        height: 86,
        justifyContent: "center",
        paddingBottom: 15,
        paddingLeft: 14,
        paddingTop: 19,
        paddingRight: 20,
        position: "relative",
        width: "100%"
    },
    text: {
        flex: 1,
        flexDirection: "row",
        fontSize: 16,
        paddingLeft: 14
    },
    timestamp: {
        color: "#a8b3bb",
        fontSize: 14,
        justifyContent: "center",
        right: 0,
        textAlign: "center",
        width: 65
    }
});
