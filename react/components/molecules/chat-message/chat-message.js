import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
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
            replyLabel: PropTypes.string,
            repliesLabel: PropTypes.string,
            repliesTextColor: PropTypes.string,
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
            style: PropTypes.any,
            messageStyle: PropTypes.any
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
            replyLabel: "reply",
            repliesLabel: "replies",
            repliesTextColor: "#6051f2",
            repliesAvatars: [],
            attachments: [],
            imagePlaceholder: undefined,
            underlayColor: "#f3f5ff",
            onPress: undefined,
            style: {},
            messageStyle: {}
        };
    }

    _chatMessageComponent() {
        return this.props.onPress ? Touchable : View;
    }

    _attachmentsStyle = () => {
        return { marginTop: this.props.message ? 10 : 0 };
    };

    _attachmentStyle = index => {
        return { marginTop: index > 0 ? 2 : 0 };
    };

    _messageStyle = () => {
        return [styles.message, this.props.messageStyle];
    };

    _repliesTextStyle = () => {
        return [styles.repliesText, { color: this.props.repliesTextColor }];
    };

    _renderHeader = () => {
        return (
            <>
                <Text style={styles.username}>{this.props.username}</Text>
                <Text style={styles.date}>
                    {dateTimeString(this.props.date, { seconds: false })}
                </Text>
            </>
        );
    };

    _renderContentStatus = () => {
        if (!this.props.status) return null;
        return (
            <StatusEntry
                style={styles.status}
                status={this.props.status}
                {...this.props.statusProps}
            />
        );
    };

    _renderContentText = () => {
        if (!this.props.message) return null;
        return <Text style={styles.text}>{this.props.message}</Text>;
    };

    _renderContentReplies = () => {
        if (!this.props.replies) return null;
        return (
            <View style={styles.replies}>
                <AvatarList avatars={this.props.repliesAvatars} size={24} />
                <Text style={this._repliesTextStyle()}>
                    {this.props.replies}{" "}
                    {this.props.replies > 1 ? this.props.repliesLabel : this.props.replyLabel}
                </Text>
            </View>
        );
    };

    _renderContentAttachments = () => {
        return this.props.attachments.map((attachment, index) => (
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
        ));
    };

    render() {
        const ChatMessageComponent = this._chatMessageComponent();
        return (
            <ChatMessageComponent
                style={this.props.style}
                underlayColor={this.props.underlayColor}
                onPress={this.props.onPress}
            >
                <View style={this._messageStyle()}>
                    <View style={styles.messageLeft}>
                        <Avatar
                            style={styles.avatar}
                            image={{ uri: this.props.avatarUrl }}
                            size={32}
                        />
                    </View>
                    <View style={styles.messageRight}>
                        <View style={styles.header}>{this._renderHeader()}</View>
                        <View style={styles.content}>
                            {this._renderContentText()}
                            {this._renderContentStatus()}
                            {this._renderContentReplies()}
                            {this._renderContentAttachments()}
                        </View>
                    </View>
                </View>
            </ChatMessageComponent>
        );
    }
}

const styles = StyleSheet.create({
    message: {
        flex: 1,
        width: "100%",
        flexDirection: "row"
    },
    messageRight: {
        flex: 1,
        width: "100%",
        overflow: "hidden"
    },
    avatar: {
        marginEnd: 9,
        marginTop: 5
    },
    header: {
        justifyContent: "flex-start",
        flexDirection: "column",
        marginTop: 3
    },
    content: {
        paddingTop: 10
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
    status: {
        marginBottom: 3
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
        lineHeight: 14,
        marginTop: 3
    }
});

export default ChatMessage;
