import React, { PureComponent } from "react";
import {
    ViewPropTypes,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native";

import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { ChatMessage, RichTextInput } from "../../molecules";

export class Chat extends PureComponent {
    static get propTypes() {
        return {
            avatarUrl: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            messages: PropTypes.arrayOf(
                PropTypes.exact({
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
                })
            ),
            onNewMessage: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            messages: [],
            onNewMessage: () => {},
            style: {}
        };
    }

    scrollToEnd = () => {
        this.scrollViewComponent.scrollToEnd({ animated: true });
    };

    onRichTextInputPhotoAdded = source => {
        const message = {
            avatarUrl: this.props.avatarUrl,
            username: this.props.username,
            message: undefined,
            date: Date.now(),
            attachments: [source]
        };

        this.props.onNewMessage(message);
    };

    onRichTextInputAttachmentsAdded = attachments => {
        const message = {
            avatarUrl: this.props.avatarUrl,
            username: this.props.username,
            message: undefined,
            date: Date.now(),
            attachments: attachments
        };

        this.props.onNewMessage(message);
    };

    onRichTextInputSendMessage = text => {
        const message = {
            avatarUrl: this.props.avatarUrl,
            username: this.props.username,
            message: text,
            date: Date.now(),
            attachments: []
        };

        this.props.onNewMessage(message);
        this.scrollToEnd();
    };

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : undefined}
                style={[styles.chat, this.props.style]}
            >
                <ScrollView
                    style={styles.chatMessagesContainer}
                    ref={ref => (this.scrollViewComponent = ref)}
                    onContentSizeChange={this.scrollToEnd}
                >
                    {this.props.messages.map((message, index) => {
                        return (
                            <ChatMessage
                                style={index !== 0 && styles.chatMessage}
                                avatarUrl={message.avatarUrl}
                                username={message.username}
                                message={message.message}
                                date={message.date}
                                attachments={message.attachments}
                                key={index}
                            />
                        );
                    })}
                </ScrollView>
                <RichTextInput
                    style={styles.richTextInput}
                    placeholder={"Say something..."}
                    multiline={true}
                    textareaMaxHeight={baseStyles.FONT_SIZE * 5}
                    onPhotoAdded={image => this.onRichTextInputPhotoAdded(image)}
                    onAttachmentsAdded={attachments =>
                        this.onRichTextInputAttachmentsAdded(attachments)
                    }
                    onSendMessage={text => this.onRichTextInputSendMessage(text)}
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    chat: {
        flex: 1
    },
    chatMessagesContainer: {
        flex: 1,
        backgroundColor: "#f6f7f9"
    },
    chatMessage: {
        marginTop: 32
    }
});

export default Chat;
