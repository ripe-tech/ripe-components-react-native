import React, { PureComponent } from "react";
import {
    Image,
    InputAccessoryView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ViewPropTypes
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
                    id: PropTypes.number,
                    avatarUrl: PropTypes.string.isRequired,
                    username: PropTypes.string.isRequired,
                    date: PropTypes.number.isRequired,
                    message: PropTypes.string,
                    status: PropTypes.string,
                    statusProps: PropTypes.object,
                    replies: PropTypes.number,
                    repliesAvatars: PropTypes.array,
                    onPress: PropTypes.func,
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
            imagePlaceholder: PropTypes.object,
            onNewMessage: PropTypes.func,
            onScrollBottom: PropTypes.func,
            onScroll: PropTypes.func,
            chatMessagesContainerStyle: ViewPropTypes.style,
            chatMessagesContentStyle: ViewPropTypes.style,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            messages: [],
            aggregationThreshold: 3600,
            animateScrollBottom: true,
            imagePlaceholder: undefined,
            onNewMessage: () => {},
            onScrollBottom: () => {},
            onScroll: event => {},
            onInputFocus: event => {},
            onInputBlur: event => {},
            chatMessagesContainerStyle: {},
            chatMessagesContentStyle: {},
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
        const originalMessages = this.props.messages.map(message => ({ ...message }));
        for (const message of originalMessages) {
            if (
                !message.status &&
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

    _style() {
        return [styles.chat, this.props.style];
    }

    _chatMessagesContainerStyle() {
        return [styles.chatMessagesContainer, this.props.chatMessagesContainerStyle];
    }

    _chatMessagesContentStyle() {
        return [styles.chatMessagesContent, this.props.chatMessagesContentStyle];
    }

    _chatMessageStyle(index) {
        return [styles.chatMessage, index === 0 ? { marginTop: 0 } : {}];
    }

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
            <View style={this._style()}>
                <ScrollView
                    style={this._chatMessagesContainerStyle()}
                    ref={ref => (this.scrollViewComponent = ref)}
                    onScroll={this.onScroll}
                    scrollEventThrottle={4}
                >
                    {this.props.messages.length === 0 ? (
                        this._renderNoMessages()
                    ) : (
                        <View style={this._chatMessagesContentStyle()}>
                            {this._aggregatedMessages().map((message, index) => {
                                return (
                                    <ChatMessage
                                        key={index}
                                        style={this._chatMessageStyle()}
                                        avatarUrl={message.avatarUrl}
                                        username={message.username}
                                        date={message.date}
                                        message={message.message}
                                        status={message.status}
                                        statusProps={message.statusProps}
                                        replies={message.replies}
                                        repliesAvatars={message.repliesAvatars}
                                        attachments={message.attachments}
                                        onPress={message.onPress}
                                        imagePlaceholder={this.props.imagePlaceholder}
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
                    onFocus={this.props.onInputFocus}
                    onBlur={this.props.onInputBlur}
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
        backgroundColor: "#ffffff"
    },
    chatMessagesContent: {
        paddingTop: 12,
        marginBottom: -1
    },
    chatMessage: {
        marginTop: 16,
        borderStyle: "solid",
        borderBottomColor: "#dfe2e5",
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    noMessages: {
        alignItems: "center",
        marginTop: "40%"
    },
    noMessagesImage: {
        width: 150,
        height: 150
    },
    noMessagesText: {
        color: "#57626e",
        fontFamily: baseStyles.FONT_BOOK
    },
    richTextInput: {
        borderStyle: "solid",
        borderTopColor: "#dfe2e5",
        borderTopWidth: 1
    }
});

export default Chat;
