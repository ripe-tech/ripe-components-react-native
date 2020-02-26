import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import PropTypes from "prop-types";

import { isImage, dateString, timeString } from "../../../util";

import { Avatar, Text, Icon, link } from "../../atoms";

export class ChatMessage extends PureComponent {
    static get propTypes() {
        return {
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
        };
    }

    static get defaultProps() {
        return {
            avatarUrl: undefined,
            username: undefined,
            message: undefined,
            date: undefined,
            attachments: []
        };
    }

    render() {
        return (
            <View>
                <Avatar image={{ uri: this.props.avatarUrl }} size={50} />
                <View>
                    <View>
                        <Text>{this.props.username}</Text>
                        <Text>{dateString(this.props.date)} {timeString(this.props.date)}</Text>
                    </View>
                    <Text>{this.props.message}</Text>
                    {this.props.attachments.map(attachment => {
                        return <Text>{attachment.name}</Text>;
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default ChatMessage;
