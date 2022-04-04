import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { dateTimeString, isImage } from "ripe-commons-native";

import { baseStyles } from "../../../util";

import { Attachment, Avatar, Lightbox, StatusEntry, Text, Touchable } from "../../atoms";
import { AvatarList } from "../avatar-list";

export class ChatMessage extends PureComponent {
    static get propTypes() {
        return {
            id: PropTypes.number,
            avatarUrl: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            date: PropTypes.number.isRequired,
            message: PropTypes.string,
            status: PropTypes.string,
            statusProps: PropTypes.object,
            replies: PropTypes.number,
            repliesAvatars: PropTypes.array,
            attachments: PropTypes.arrayOf(
                PropTypes.exact({
                    name: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired
                })
            ),
            imagePlaceholder: PropTypes.object,
            underlayColor: PropTypes.string,
            onPress: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            date: undefined,
            message: undefined,
            status: undefined,
            statusProps: {},
            replies: undefined,
            repliesAvatars: [],
            attachments: [],
            imagePlaceholder: undefined,
            underlayColor: "f3f5ff",
            onPress: undefined,
            style: {},
            styles: styles
        };
    }

    _attachmentsStyle = () => {
        return { marginTop: this.props.message ? 10 : 0 };
    };

    _attachmentStyle = index => {
        return { marginTop: index > 0 ? 2 : 0 };
    };

    _chatMessageComponent = () => {
        return this.props.onPress ? Touchable : View;
    };

    render() {
        const ChatMessageComponent = this._chatMessageComponent();
        return (
            <View
                style={[styles.chatMessage, this.props.style]}
                underlayColor={this.props.underlayColor}
                onPress={this.props.onPress}
            >
                <Avatar style={styles.avatar} image={{ uri: this.props.avatarUrl }} size={32} />
                <View style={styles.message}>
                    <View style={styles.header}>
                        <Text style={styles.username}>{this.props.username}</Text>
                        <Text style={styles.date}>
                            {dateTimeString(this.props.date, { seconds: false })}
                        </Text>
                    </View>
                    {this.props.message ? (
                        <Text style={styles.text}>{this.props.message}</Text>
                    ) : null}
                    {this.props.status ? (
                        <StatusEntry
                            style={styles.status}
                            status={this.props.status}
                            {...this.props.statusProps}
                        />
                    ) : null}
                    {this.props.replies ? (
                        <View style={styles.replies}>
                            <AvatarList avatars={this.props.repliesAvatars} size={24} />
                            <Text style={styles.repliesText}>
                                {this.props.replies} {this.props.replies > 1 ? "replies" : "reply"}
                            </Text>
                        </View>
                    ) : null}
                    {this.props.attachments.map((attachment, index) => (
                        <View style={this._attachmentsStyle()} key={index}>
                            {isImage(attachment.name) ? (
                                <Lightbox
                                    style={this._attachmentStyle(index)}
                                    height={180}
                                    uri={attachment.path}
                                    resizeMode={"contain"}
                                    placeholder={this.props.imagePlaceholder}
                                />
                            ) : (
                                <Attachment
                                    style={this._attachmentStyle(index)}
                                    filename={attachment.name}
                                    url={attachment.path}
                                />
                            )}
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chatMessage: {
        flexDirection: "row",
        width: "100%"
    },
    avatar: {
        marginEnd: 9,
        marginTop: 3
    },
    message: {
        flex: 1
    },
    header: {
        justifyContent: "flex-start",
        flexDirection: "column",
        marginTop: 3
    },
    username: {
        fontFamily: baseStyles.FONT_BOLD,
        marginEnd: 5,
        fontSize: 14,
        lineHeight: 18,
        color: "#3e566a"
    },
    date: {
        fontFamily: baseStyles.FONT,
        color: "#a4adb5",
        fontSize: 11,
        lineHeight: 18
    },
    text: {
        marginTop: 4
    },
    status: {
        marginTop: 4
    },
    replies: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    repliesText: {
        marginLeft: 8,
        fontFamily: baseStyles.FONT,
        fontSize: 14,
        color: "#6051f2"
    }
});

export default ChatMessage;
