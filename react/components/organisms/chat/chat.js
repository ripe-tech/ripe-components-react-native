import React, { PureComponent } from "react";
import { ScrollView, StyleSheet, View, ViewPropTypes } from "react-native";
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
            animateScrollBottom: PropTypes.bool,
            onNewMessage: PropTypes.func,
            onScrollBottom: PropTypes.func,
            onScroll: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            messages: [],
            animateScrollBottom: true,
            onNewMessage: () => {},
            onScrollBottom: () => {},
            onScroll: event => {},
            style: {}
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

    scrollToEnd = () => {
        this.scrollViewComponent.scrollToEnd({ animated: this.props.animateScrollBottom });
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

    render() {
        return (
            <View style={[styles.chat, this.props.style]}>
                <ScrollView
                    style={styles.chatMessagesContainer}
                    ref={ref => (this.scrollViewComponent = ref)}
                    onContentSizeChange={this.scrollToEnd}
                    onScroll={this.onScroll}
                >
                    <View style={styles.chatMessagesContent}>
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
                    </View>
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
    }
});

export default Chat;
