import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, ScrollView } from "react-native";

import PropTypes from "prop-types";

import { ChatMessage } from "../..";

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

    _style = () => {
        return [this.props.style];
    };

    render() {
        return (
            <ScrollView>
                {this.props.messages.map((message, index) => {
                    return (
                        <ChatMessage
                            style={styles.chatMessage}
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
        );
    }
}

const styles = StyleSheet.create({
    chatMessage: {
        marginTop: 32
    }
});

export default Chat;
