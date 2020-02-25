import React, { PureComponent } from "react";
import { ViewPropTypes, Text as RNText } from "react-native";

import PropTypes from "prop-types";

export class Text extends PureComponent {
    static get propTypes() {
        return {};
    }

    static get defaultProps() {
        return {};
    }

    _style = () => {
        return {};
    };

    render() {
        return <RNText>Hi! I'm Text</RNText>;
    }
}

export default Text;
