import React, { PureComponent } from "react";
import { ScrollView, StyleSheet, Image, Text, View, ViewPropTypes } from "react-native";
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
                    )
                })
            ),
            aggregationThreshold: PropTypes.number,
            animateScrollBottom: PropTypes.bool,
            onNewMessage: PropTypes.func,
            onScrollBottom: PropTypes.func,
            onScroll: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            messages: [],
            aggregationThreshold: 120,
            animateScrollBottom: true,
            onNewMessage: () => {},
            onScrollBottom: () => {},
            onScroll: event => {},
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            messages: this.props.messages,
            sendingMessage: false
        };
    }

    focus = () => {
        this.input.focus();
    };

    blur = () => {
        this.input.blur();
    };

    scrollToEnd = animated => {
        animated = animated === undefined ? this.props.animateScrollBottom : animated;
        this.scrollViewComponent.scrollToEnd({ animated: animated });
    };

    getInputValue = () => (this.input ? this.input.state.value || null : null);

    onScroll = event => {
        this.props.onScroll(event);
        if (
            event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >=
            event.nativeEvent.contentSize.height
        ) {
            this.props.onScrollBottom();
        }
    };

    _aggregatedMessages() {
        const messages = [];
        let previousMessage = null;
        let previousDate = null;
        for (const message of this.props.messages) {
            if (
                previousMessage &&
                previousMessage.message &&
                message.message &&
                message.username === previousMessage.username &&
                message.date - previousDate < this.props.aggregationThreshold
            ) {
                previousMessage.message += `\n${message.message}`;
            } else {
                messages.push(message);
                previousMessage = message;
            }
            previousDate = message.date;
        }
        return messages;
    }

    async _onNewMessage(message) {
        this.setState({ sendingMessage: true }, () => {
            let result = true;
            try {
                result = this.props.onNewMessage(message);
            } catch (err) {
                result = null;
            }
            if (result) {
                this.setState({ sendingMessage: false }, () => {
                    this.scrollToEnd();
                    this.input.setValue("");
                });
            } else {
                this.setState({ sendingMessage: false });
            }
        });
    }

    onRichTextInputPhotoAdded = async source => {
        const message = {
            avatarUrl: this.props.avatarUrl,
            username: this.props.username,
            message: this.getInputValue(),
            date: Date.now(),
            attachments: source
        };
        await this._onNewMessage(message);
    };

    onRichTextInputAttachmentsAdded = async attachments => {
        const message = {
            avatarUrl: this.props.avatarUrl,
            username: this.props.username,
            message: this.getInputValue(),
            date: Date.now(),
            attachments: attachments
        };
        await this._onNewMessage(message);
    };

    onRichTextInputSendMessage = async text => {
        const message = {
            avatarUrl: this.props.avatarUrl,
            username: this.props.username,
            message: text,
            date: Date.now(),
            attachments: []
        };
        await this._onNewMessage(message);
    };

    _renderNoMessages = () => {
        return (
            <View style={styles.noMessages}>
                <Image
                    style={styles.noMessagesImage}
                    source={require("./assets/no-messages.png")}
                />
                <Text style={styles.noMessagesText}>No messages, yet</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={[styles.chat, this.props.style]}>
                <ScrollView
                    style={styles.chatMessagesContainer}
                    ref={ref => (this.scrollViewComponent = ref)}
                    onContentSizeChange={() => this.scrollToEnd(false)}
                    onScroll={this.onScroll}
                >
                    {this.props.messages.length === 0 ? (
                        this._renderNoMessages()
                    ) : (
                        <View style={styles.chatMessagesContent}>
                            {this._aggregatedMessages().map((message, index) => {
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
                        </View>
                    )}
                </ScrollView>
                <RichTextInput
                    ref={el => (this.input = el)}
                    style={styles.richTextInput}
                    placeholder={"Say something..."}
                    sendButtonProps={{ loading: this.state.sendingMessage }}
                    multiline={true}
                    textareaMaxHeight={baseStyles.FONT_SIZE * 5}
                    onPhotoAdded={image => this.onRichTextInputPhotoAdded(image)}
                    onAttachmentsAdded={attachments =>
                        this.onRichTextInputAttachmentsAdded(attachments)
                    }
                    onSendMessage={text => this.onRichTextInputSendMessage(text)}
                />
            </View>
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
    chatMessagesContent: {
        paddingVertical: 12
    },
    chatMessage: {
        marginTop: 16
    },
    noMessages: {
        alignItems: "center",
        marginTop: "10%"
    },
    noMessagesImage: {
        width: 150,
        height: 150
    },
    noMessagesText: {
        color: "#57626e",
        fontFamily: baseStyles.FONT_BOOK
    }
});

export default Chat;
