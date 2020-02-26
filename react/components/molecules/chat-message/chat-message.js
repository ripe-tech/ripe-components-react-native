import React, { PureComponent } from "react";
import { StyleSheet, Text } from "react-native";

import PropTypes from "prop-types";

export class ChatMessage extends PureComponent {
    static get propTypes() {
        return {};
    }

    static get defaultProps() {
        return {};
    }

    render() {
        return <Text>Hi! I'm ChatMessage</Text>;
    }
}

const styles = StyleSheet.create({});

export default ChatMessage;
