import React, { PureComponent } from "react";
import { Text } from "react-native";

import PropTypes from "prop-types";

export class Container extends PureComponent {
    static get propTypes() {
        return {};
    }

    static get defaultProps() {
        return {};
    }

    _style = () => {
        return [{}, this.props.style];
    };

    render() {
        return <Text>Hi! I'm Container</Text>;
    }
}

export default Container;
