import React, { PureComponent } from "react";
import { ViewPropTypes, Text } from "react-native";

import PropTypes from "prop-types";

export class Container extends PureComponent {
    static get propTypes() {
        return {
            header: PropTypes.bool,
            headerIcon: PropTypes.string,
            headerDate: PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            header: false,
            headerIcon: undefined,
            headerDate: undefined,
            style: {}
        };
    }

    _style = () => {
        return [{}, this.props.style];
    };

    propsTest = () => {
        return `${this.props.header}\n${this.props.headerIcon}\n${this.props.headerDate}`;
    };

    render() {
        return <Text>{this.propsTest()}</Text>;
    }
}

export default Container;
