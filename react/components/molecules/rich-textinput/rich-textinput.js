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
                        style={styles.button}
                        icon={"camera"}
                        size={32}
                        color={"#375274"}
                        backgroundColor={"#ffffff"}
                        iconHeight={28}
                        iconWidth={28}
                        onPress={() => this.onPhotoButtonPress()}
                    />
                    <ButtonIcon
                        style={styles.button}
                        icon={"clip"}
                        size={32}
                        color={"#375274"}
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
                    color={"#375274"}
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
        flexDirection: "row",
        backgroundColor: "#ffffff",
        paddingTop: 8,
        paddingBottom: 8
    },
    textArea: {
        flex: 1,
        backgroundColor: "#f6f7f9",
        borderRadius: 20,
    },
    buttons: {
        flexDirection: "row",
        alignSelf: 'flex-end',
        paddingLeft: 5,
        paddingRight: 5
    },
    button: {
        marginLeft: 10
    },
    sendButton: {
        alignSelf: "flex-end",
        marginLeft: 5,
        marginRight: 5
    }
});

export default RichTextInput;
