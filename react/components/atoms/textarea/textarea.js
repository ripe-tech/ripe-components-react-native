import React, { PureComponent } from "react";
import {Text} from "react-native";

import PropTypes from "prop-types";

export class Textarea extends PureComponent {
    static get propTypes() {
        return {};
    }

    static get defaultProps() {
        return {};
    }

    _imageStyles = () => {
        return [];
    };

    render() {
        return (
            <Text>Hello ! I'm textarea</Text>
        );
    }
}

export default Textarea;
