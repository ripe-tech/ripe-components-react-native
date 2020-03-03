import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View, Text } from "react-native";

import PropTypes from "prop-types";

import { ButtonIcon, TextArea } from "../..";

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

    render() {
        return (
            <View style={[styles.richTextInput, this.props.style]}>
                <View style={styles.buttons}>
                    <ButtonIcon
                        icon={"happy-face"}
                        size={30}
                        color={"#000000"}
                        backgroundColor={"#ff00ff"}
                        iconStrokeWidth={1}
                        iconHeight={28}
                        iconWidth={28}
                        onPress={() => alert("Button 1!")}
                    />
                    <ButtonIcon
                        icon={"happy-face"}
                        size={30}
                        color={"#000000"}
                        backgroundColor={"#ff00ff"}
                        iconStrokeWidth={1}
                        iconHeight={28}
                        iconWidth={28}
                        onPress={() => alert("Button 2!")}
                    />
                </View>

                <TextArea />
                <ButtonIcon
                    icon={"happy-face"}
                    size={30}
                    color={"#000000"}
                    backgroundColor={"#ff00ff"}
                    iconStrokeWidth={1}
                    iconHeight={28}
                    iconWidth={28}
                    onPress={() => alert("Button 3!")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    richTextInput: {
        backgroundColor: "#00ccff"
    },
    buttons: {
        backgroundColor: "#00cc00"
    }
});

export default RichTextInput;
