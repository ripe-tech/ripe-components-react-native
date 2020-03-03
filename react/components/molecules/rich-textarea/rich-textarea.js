import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Text } from "react-native";

import PropTypes from "prop-types";

export class RichTextArea extends PureComponent {
    static get propTypes() {
        return {
            value: PropTypes.string,
            placeholder: PropTypes.string,
            multiline: PropTypes.bool,
            minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            onValue: PropTypes.func,
            onAttachmentAdded: PropTypes.func,
            onAttachmentRemoved: PropTypes.func,
            onImageAdded: PropTypes.func,
            onImageRemoved: PropTypes.func,
            onSendMessage: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            value: undefined,
            placeholder: undefined,
            multiline: false,
            minHeight: undefined,
            maxHeight: undefined,
            onValue: () => {},
            onAttachmentAdded: () => {},
            onAttachmentRemoved: () => {},
            onImageAdded: () => {},
            onImageRemoved: () => {},
            onSendMessage: () => {},
            style: {}
        };
    }

    _style = () => {
        return [this.props.style];
    };


    propsTest = () => {
        return `${this.props.value}\n${this.props.placeholder}\n${this.props.multiline}\n${this.props.minHeight}\n${this.props.maxHeight}`
    }

    render() {
        return <Text>{this.propsTest()}</Text>;
    }
}

const styles = StyleSheet.create({
    richTextArea: {}
});

export default RichTextArea;
