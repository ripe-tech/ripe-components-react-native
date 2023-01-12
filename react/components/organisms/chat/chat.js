import React, { PureComponent } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { Listing } from "ripe-components-react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { ChatMessage, ChatMessagePlaceholder, RichTextInput } from "../../molecules";

import noMessageAnimation from "./assets/no-messages-animation.svga";

export class Chat extends PureComponent {
    static get propTypes() {
        return {
            avatarUrl: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            beforeMessages: PropTypes.object,
            messages: PropTypes.arrayOf(
                PropTypes.exact({
                    id: PropTypes.number,
                    avatarUrl: PropTypes.string.isRequired,
                    username: PropTypes.string.isRequired,
                    date: PropTypes.number.isRequired,
                    message: PropTypes.string,
                    text: PropTypes.string,
                    status: PropTypes.string,
                    statusProps: PropTypes.object,
                    replies: PropTypes.number,
                    replyLabel: PropTypes.string,
                    repliesLabel: PropTypes.string,
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
            getMessages: PropTypes.func,
            aggregationThreshold: PropTypes.number,
            animateScrollBottom: PropTypes.bool,
            textInputPlaceholder: PropTypes.string,
            noMessagesPlaceholder: PropTypes.string,
            imagePlaceholder: PropTypes.object,
            repliesTextColor: PropTypes.string,
            onNewMessage: PropTypes.func,
            onScrollBottom: PropTypes.func,
            onScroll: PropTypes.func,
            onInputFocus: PropTypes.func,
            onInputBlur: PropTypes.func,
            onRefreshComplete: PropTypes.func,
            style: PropTypes.any,
            styles: PropTypes.any,
            chatMessageStyle: PropTypes.any,
            chatMessagesContainerStyle: PropTypes.any,
            chatMessagesContentStyle: PropTypes.any,
            chatMessageContentStyle: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            beforeMessages: null,
            messages: [],
            getMessages: null,
            aggregationThreshold: 3600,
            animateScrollBottom: true,
            textInputPlaceholder: "Say something...",
            noMessagesPlaceholder: "No messages, yet",
            imagePlaceholder: undefined,
            repliesTextColor: "#6051f2",
            onNewMessage: () => {},
            onScrollBottom: () => {},
            onScroll: event => {},
            onInputFocus: event => {},
            onInputBlur: event => {},
            style: {},
            styles: styles,
            chatMessagesStyle: {},
            chatMessagesContainerStyle: {},
            chatMessagesContentStyle: {},
            chatMessageContentStyle: {}
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
        if (!this.chatListingRef?.flatListRef?.getNativeScrollRef) return;

        const scrollViewComponentRef = this.chatListingRef.flatListRef.getNativeScrollRef();
        animated = animated === undefined ? this.props.animateScrollBottom : animated;
        scrollViewComponentRef.scrollTo({ x: 0, y: 0 }, { animated: animated });
    };

    addMessages = messages => {
        this.chatListingRef.addItems(messages, true);
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

    _aggregateMessages(messages) {
        const agregatedMessages = [];
        let previousMessage = null;
        let previousDate = null;
        const originalMessages = messages.map(message => ({ ...message }));
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
                agregatedMessages.push(message);
                previousMessage = message;
            }
            previousDate = message.date;
        }
        return agregatedMessages;
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

    _chatMessageContentStyle() {
        return [styles.chatMessageContent, this.props.chatMessageContentStyle];
    }

    _chatMessageStyle(index) {
        return [
            styles.chatMessage,
            index === 0 ? { marginTop: 0 } : {},
            this.props.chatMessageStyle
        ];
    }

    _renderNoMessages = () => {
        return (
            <View style={styles.noMessages}>
                <WebView
                    style={styles.noMessagesImage}
                    source={{ html: noMessageAnimation }}
                    androidLayerType={"software"}
                />
                <Text style={styles.noMessagesText}>{this.props.noMessagesPlaceholder}</Text>
            </View>
        );
    };

    async _getChatMessages(...args) {
        if (this.props.getMessages) {
            const formatttedFilters = {
                ...args[0],
                number_records: args[0]?.limit,
                start_record: args[0]?.start
            };
            const formatttedExtraFilters = { ...args[1] };
            const chatMessages = await this.props.getMessages(
                formatttedFilters,
                formatttedExtraFilters
            );
            // reverse message array for the inverted listing
            // placing the most recent message at the end
            const agregatedMessages = this._aggregateMessages(chatMessages);
            const reversedMessages = agregatedMessages.reverse();
            return reversedMessages;
        } else {
            return [];
        }
    }

    _renderChatMessage(message) {
        return (
            <ChatMessage
                style={this._chatMessageStyle()}
                messageStyle={this._chatMessageContentStyle()}
                avatarUrl={message.avatarUrl}
                username={message.username}
                date={message.date}
                message={message.message}
                status={message.status}
                statusProps={message.statusProps}
                replies={message.replies}
                replyLabel={message.repliesLabel}
                repliesLabel={message.repliesLabel}
                repliesTextColor={this.props.repliesTextColor}
                repliesAvatars={message.repliesAvatars}
                attachments={message.attachments}
                onPress={message.onPress}
                imagePlaceholder={this.props.imagePlaceholder}
            />
        );
    }

    _renderFooter() {
        if (this.props.beforeMessages) {
            return <View style={styles.footerContainer}>{this.props.beforeMessages}</View>;
        }
        return <View style={styles.footerContainer} />;
    }

    _renderLoadingFooter() {
        return (
            <View style={styles.chatMessagePlaceholderContainer}>
                <ChatMessagePlaceholder />
                <ChatMessagePlaceholder />
            </View>
        );
    }

    render() {
        return (
            <View style={this._style()}>
                <Listing
                    ref={el => (this.chatListingRef = el)}
                    style={styles.chatListing}
                    listingContentStyle={styles.chatListingContent}
                    getItems={async (...args) => await this._getChatMessages(...args)}
                    renderItem={(...args) => this._renderChatMessage(...args)}
                    renderFooter={(...args) => this._renderFooter(...args)}
                    renderLoadingFooter={(...args) => this._renderLoadingFooter(...args)}
                    renderEmptyList={(...args) => this._renderNoMessages(...args)}
                    filters={this._filters}
                    itemsSortReverse={true}
                    search={false}
                    onEndReachedThreshold={300}
                    onRefreshComplete={this.props.onRefreshComplete}
                    flatListProps={{
                        inverted: true,
                        onScroll: this.onScroll,
                        keyExtractor: (item, index) => index
                    }}
                />
                <RichTextInput
                    ref={el => (this.input = el)}
                    style={styles.richTextInput}
                    placeholder={this.props.textInputPlaceholder}
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
    chatListing: {
        backgroundColor: "#ffffff"
    },
    chatListingContent: {
        height: "auto",
        backgroundColor: "#ffffff",
        flexGrow: 0
    },
    chatMessagePlaceholderContainer: {
        marginTop: 100
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
        paddingTop: 16,
        borderStyle: "solid",
        borderBottomColor: "#dfe2e5",
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    footerContainer: {
        height: 100
    },
    loadingFooterContainer: {
        height: 100
    },
    noMessages: {
        alignItems: "center",
        paddingTop: "40%"
    },
    noMessagesImage: {
        width: 250,
        height: 180
    },
    noMessagesText: {
        margin: 20,
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
