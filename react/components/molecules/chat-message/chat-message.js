import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { dateTimeString, isImage } from "ripe-commons-native";

import { baseStyles } from "../../../util";

import { Attachment, Avatar, Lightbox, StatusEntry, Text } from "../../atoms";

export class ChatMessage extends PureComponent {
    static get propTypes() {
        return {
            id: PropTypes.number,
            avatarUrl: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            date: PropTypes.number.isRequired,
            message: PropTypes.string,
            status: PropTypes.string,
            attachments: PropTypes.arrayOf(
                PropTypes.exact({
                    name: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired
                })
            ),
            imagePlaceholder: PropTypes.object,
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
            attachments: [],
            imagePlaceholder: undefined,
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

    render() {
        return (
            <View style={[styles.chatMessage, this.props.style]}>
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
                        <StatusEntry style={styles.text} status={this.props.status} />
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
                                    url={attachment.url}
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
    }
});

export default ChatMessage;
