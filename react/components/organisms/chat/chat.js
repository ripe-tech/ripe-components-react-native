import React, { PureComponent } from "react";
import { ViewPropTypes, ScrollView } from "react-native";

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

    propsTest = () => {
        let str = "";
        this.props.messages.forEach(msg => {
            str += `${msg.username}\n${msg.avatarUrl}\n${msg.message}\n${msg.date}\n${msg.attachments}\n\n\n`;
        });

        return str;
    };

    render() {
        return (
            <ScrollView>
                {this.props.messages.map((message, index) => {
                    return (
                        <ChatMessage
                            avatarUrl={message.avatarUrl}
                            username={message.username}
                            message={message.message}
                            date={message.date}
                            attachments={message.attachments}
                        />
                    );
                })}
            </ScrollView>
        );
    }
}

export default Chat;
