import React, { PureComponent } from "react";
import { StyleSheet, View, Image } from "react-native";

import PropTypes from "prop-types";

import { isImage, dateString, timeString } from "../../../util";

import { Avatar, Text, Icon, Link } from "../../atoms";

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
        const attachedFile = (name, url) => {
            return (
                <View style={styles.attachedFile}>
                    <Icon style={styles.attachedFileIcon} icon="file" width={24} height={24} color="#1d2631" />
                    <Link text={name} url={url} />
                </View>
            );
        };
        const attachedImage = imgPath => {
            return <Image style={styles.attachedImage} source={{ uri: imgPath }} />;
        };

        return (
            <View style={styles.chatMessage}>
                <Avatar style={styles.avatar} image={{ uri: this.props.avatarUrl }} size={32} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.username}>{this.props.username}</Text>
                        <Text style={styles.date}>{this.dateData}</Text>
                    </View>
                    <Text>{this.props.message}</Text>
                    {this.props.attachments.map((attachment, index) => {
                        return (
                            <View style={styles.attachment} key={index}>
                                {isImage(attachment.name)
                                    ? attachedImage(attachment.path)
                                    : attachedFile(attachment.name, attachment.path)}
                            </View>
                        );
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
    },
    attachment: {
        marginTop: 10
    },
    attachedFile: {
        flexDirection: "row",
        alignItems: 'center'
    },
    attachedFileIcon: {
        marginEnd: 5
    },
    attachedImage: {
        width: "100%",
        height: 180
    }
});

export default ChatMessage;
