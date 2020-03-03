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
                        icon={"camera"}
                        size={32}
                        color={"#000000"}
                        backgroundColor={"#ffffff"}
                        iconHeight={28}
                        iconWidth={28}
                        onPress={() => alert("Photo !")}
                    />
                    <ButtonIcon
                        icon={"clip"}
                        size={32}
                        color={"#000000"}
                        backgroundColor={"#ffffff"}
                        iconHeight={28}
                        iconWidth={28}
                        onPress={() => alert("Attachment !")}
                    />
                </View>
                <TextArea style={styles.textArea}/>
                <ButtonIcon
                    style={styles.sendButton}
                    icon={"send"}
                    size={32}
                    color={"#000000"}
                    backgroundColor={"#ffffff"}
                    iconHeight={27}
                    iconWidth={27}
                    onPress={() => alert("Send 3!")}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    richTextInput: {
        backgroundColor: "#00ccff",
        flexDirection:'row',
    },
    textArea: {
        flex: 1,
        backgroundColor: "#cc0000",
    },
    buttons: {
        flexDirection:'row',
        backgroundColor: "#00cc00"
    },
    sendButton: {
        alignSelf: "flex-end" 
    }
});

export default RichTextInput;
