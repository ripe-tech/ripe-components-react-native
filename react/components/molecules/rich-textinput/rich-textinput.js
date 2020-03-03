import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Text } from "react-native";

import PropTypes from "prop-types";

export class RichTextInput extends PureComponent {
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

    render() {
        return <Text>RichTextInput ! :D</Text>;
    }
}

const styles = StyleSheet.create({
    RichTextInput: {}
});

export default RichTextInput;
