import React, { PureComponent } from "react";
import { StyleSheet, Text } from "react-native";

import PropTypes from "prop-types";

export class ChatMessage extends PureComponent {
    static get propTypes() {
        return {
            avatarUrl: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            attachments: PropTypes.arrayOf(
                PropTypes.exact({
                    name: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired
                })
            )
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            message: undefined,
            attachments: []
        };
    }

    propsTest = () => {
        return `${this.props.avatarUrl}\n${this.props.username}\n${this.props.message}\n${this.props.attachments}`;
    };

    render() {
        return <Text>{this.propsTest()}</Text>;
    }
}

const styles = StyleSheet.create({});

export default ChatMessage;
