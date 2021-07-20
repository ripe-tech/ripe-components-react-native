import React, { PureComponent } from "react";
import { StyleSheet, Text as RNText, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { dateTimeString, isImage } from "ripe-commons-native";

import { baseStyles } from "../../../util";

import { Avatar, Lightbox, Link, Text } from "../../atoms";

export class ChatMessage extends PureComponent {
    static get propTypes() {
        return {
            id: PropTypes.number,
            avatarUrl: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.number.isRequired,
            attachments: PropTypes.arrayOf(
                PropTypes.exact({
                    name: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired
                })
            ),
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            message: undefined,
            date: undefined,
            attachments: [],
            style: {}
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
                <View style={styles.content}>
                    <View style={styles.header}>
                        <RNText style={styles.username}>{this.props.username}</RNText>
                        <RNText style={styles.date}>{dateTimeString(this.props.date)}</RNText>
                    </View>
                    {this.props.message ? <Text>{this.props.message}</Text> : null}
                    {this.props.attachments.map((attachment, index) => (
                        <View style={this._attachmentsStyle()} key={index}>
                            {isImage(attachment.name) ? (
                                <Lightbox
                                    style={this._attachmentStyle(index)}
                                    height={180}
                                    uri={attachment.path}
                                    resizeMode={"contain"}
                                />
                            ) : (
                                <Link
                                    style={this._attachmentStyle(index)}
                                    text={attachment.name}
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
        marginTop: 3,
        alignItems: "center"
    },
    username: {
        fontFamily: baseStyles.FONT_BOLD,
        marginEnd: 5,
        fontSize: 14,
        lineHeight: 22,
        color: "#3e566a"
    },
    date: {
        fontFamily: baseStyles.FONT,
        color: "#a4adb5",
        fontSize: 11,
        lineHeight: 22
    }
});

export default ChatMessage;
