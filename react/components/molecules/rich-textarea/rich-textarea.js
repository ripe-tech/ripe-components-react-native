import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Text } from "react-native";

import PropTypes from "prop-types";

export class RichTextArea extends PureComponent {
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
        return <Text>Hi !!! I'm RichTextArea</Text>;
    }
}

const styles = StyleSheet.create({
    richTextArea: {}
});

export default RichTextArea;
