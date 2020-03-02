import React, { PureComponent } from "react";
import { ViewPropTypes, Text } from "react-native";

import PropTypes from "prop-types";

export class Chat extends PureComponent {
    static get propTypes() {
        return {
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            style: {}
        };
    }

    _style = () => {
        return [this.props.style];
    };

    render() {
        return <Text>Hi ! I'm Chat</Text>;
    }
}

export default Chat;
