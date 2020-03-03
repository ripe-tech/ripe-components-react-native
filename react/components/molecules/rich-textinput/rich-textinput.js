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

    onPhotoButtonPress = () => {
        // TODO
        console.log("onPhotoButtonPress");

        this.props.onImageAdded();
    };

    onAttachmentButtonPress = () => {
        // TODO
        console.log("onAttachmentButtonPress");

        this.props.onAttachmentAdded();
    };

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
                        onPress={() => this.onPhotoButtonPress()}
                    />
                    <ButtonIcon
                        icon={"clip"}
                        size={32}
                        color={"#000000"}
                        backgroundColor={"#ffffff"}
                        iconHeight={28}
                        iconWidth={28}
                        onPress={() => this.onAttachmentButtonPress()}
                    />
                </View>
                <TextArea
                    style={styles.textArea}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    multiline={this.props.multiline}
                    minHeight={this.props.minHeight}
                    maxHeight={this.props.maxHeight}
                    onValue={this.props.onValue}
                />
                <ButtonIcon
                    style={styles.sendButton}
                    icon={"send"}
                    size={32}
                    color={"#000000"}
                    backgroundColor={"#ffffff"}
                    iconHeight={27}
                    iconWidth={27}
                    onPress={() => this.props.onSendMessage()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    richTextInput: {
        backgroundColor: "#00ccff",
        flexDirection: "row"
    },
    textArea: {
        flex: 1,
        backgroundColor: "#ff9999"
    },
    buttons: {
        flexDirection: "row",
        backgroundColor: "#00cc00"
    },
    sendButton: {
        alignSelf: "flex-end"
    }
});

export default RichTextInput;
