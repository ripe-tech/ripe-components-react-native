import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import PropTypes from "prop-types";

import { isImage, dateString, timeString } from "../../../util";

import { Avatar, Text, Icon, link } from "../../atoms";

export class ChatMessage extends PureComponent {
    constructor(props) {
        super(props);

        this.dateData =
            new Date().getDate() === new Date(props.date).getDate()
                ? timeString(this.props.date)
                : `${dateString(this.props.date)} ${timeString(this.props.date)}`;
    }

    static get propTypes() {
        return {
            avatarUrl: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.number.isRequired,
            attachments: PropTypes.arrayOf(
                PropTypes.exact({
                    name: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired
                })
            )
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            message: undefined,
            date: undefined,
            attachments: []
        };
    }

    render() {
        return (
            <View style={styles.chatMessage}>
                <Avatar style={styles.avatar} image={{ uri: this.props.avatarUrl }} size={32} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.username}>{this.props.username}</Text>
                        <Text style={styles.date}>{this.dateData}</Text>
                    </View>
                    <Text>{this.props.message}</Text>
                    {this.props.attachments.map(attachment => {
                        return <Text>{attachment.name}</Text>;
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chatMessage: {
        flexDirection: "row",
        marginStart: 15,
        marginEnd: 15
    },
    avatar: {
        marginEnd: 13
    },
    content: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        marginTop: 5
    },
    username: {
        fontWeight: "bold",
        marginEnd: 5
    },
    date: {
        color: "#a4adb5"
    }
});

export default ChatMessage;
