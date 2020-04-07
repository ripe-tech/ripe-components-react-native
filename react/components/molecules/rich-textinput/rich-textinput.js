import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View, Animated, LayoutAnimation } from "react-native";
import PropTypes from "prop-types";

import { ButtonIcon, TextArea } from "../../atoms";
import { pickImage, pickDocuments } from "../../../util";

export class RichTextInput extends PureComponent {
    static get propTypes() {
        return {
            value: PropTypes.string,
            placeholder: PropTypes.string,
            multiline: PropTypes.bool,
            textareaMinHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            textareaMaxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            animationTime: PropTypes.number,
            onPhotoAdded: PropTypes.func,
            onAttachmentsAdded: PropTypes.func,
            onSendMessage: PropTypes.func,
            onFocus: PropTypes.func,
            onBlur: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            value: undefined,
            placeholder: undefined,
            multiline: false,
            textareaMinHeight: undefined,
            textareaMaxHeight: undefined,
            animationTime: 200,
            onPhotoAdded: image => {},
            onAttachmentsAdded: attachments => {},
            onSendMessage: text => {},
            onFocus: () => {},
            onBlur: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            buttonsVisible: true,
            buttonsOpacityValue: new Animated.Value(1),
            moreOptionsOpacityValue: new Animated.Value(0)
        };
    }

    focus = () => {
        this.textAreaComponent.focus();
    };

    blur = () => {
        this.textAreaComponent.blur();
    };

    startAnimations = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                this.props.animationTime,
                LayoutAnimation.Types.easeOut,
                LayoutAnimation.Properties.scaleXY
            )
        );

        if (this.state.buttonsVisible) {
            this.startShowButtonsAnimation();
        } else {
            this.startHideButtonsAnimation();
        }
    };

    startShowButtonsAnimation = () => {
        Animated.parallel([
            Animated.timing(this.state.buttonsOpacityValue, {
                toValue: 1,
                duration: this.props.animationTime
            }),
            Animated.timing(this.state.moreOptionsOpacityValue, {
                toValue: 0,
                duration: this.props.animationTime
            })
        ]).start();
    };

    startHideButtonsAnimation = () => {
        Animated.parallel([
            Animated.timing(this.state.buttonsOpacityValue, {
                toValue: 0,
                duration: this.props.animationTime
            }),
            Animated.timing(this.state.moreOptionsOpacityValue, {
                toValue: 1,
                duration: this.props.animationTime
            })
        ]).start();
    };

    sendMessage = () => {
        const value = this.state.value;
        this.setState({ value: undefined }, () => this.props.onSendMessage(value));
    };

    onPhotoButtonPress = async () => {
        const image = await pickImage();

        if (image) {
            this.props.onPhotoAdded(image);
        }
    };

    onAttachmentButtonPress = async () => {
        const attachments = await pickDocuments();

        if (attachments) {
            this.props.onAttachmentsAdded(attachments);
        }
    };

    onMoreOptionsButtonPress = () => {
        this.textAreaComponent.blur();
    };

    onTextAreaValue = value => {
        this.setState({ value: value });
    };

    onTextAreaSubmit = () => {
        this.sendMessage();
    };

    onTextAreaFocus = () => {
        this.setState({ buttonsVisible: false }, () => {
            this.startAnimations();
            this.props.onFocus();
        });
    };

    onTextAreaBlur = () => {
        this.setState({ buttonsVisible: true }, () => {
            this.startAnimations();
            this.props.onBlur();
        });
    };

    onSendButtonPress = () => {
        this.sendMessage();
    };

    _buttonsStyle = () => {
        const style = [styles.buttons, { opacity: this.state.buttonsOpacityValue }];

        if (!this.state.buttonsVisible) style.push({ width: 0 });
        return style;
    };

    _moreOptionsStyle = () => {
        const style = [
            styles.moreOptions,
            {
                opacity: this.state.moreOptionsOpacityValue
            }
        ];

        if (this.state.buttonsVisible) style.push({ width: 0 });
        return style;
    };

    _style = () => {
        return [styles.richTextInput, this.props.style];
    };

    render() {
        return (
            <View style={this._style()}>
                <Animated.View
                    style={this._buttonsStyle()}
                    pointerEvents={this.state.buttonsVisible ? undefined : "none"}
                >
                    <ButtonIcon
                        icon={"camera"}
                        size={27}
                        iconStrokeColor={"#ffffff"}
                        iconFill={"#375274"}
                        backgroundColor={"#ffffff"}
                        iconHeight={27}
                        iconWidth={27}
                        onPress={() => this.onPhotoButtonPress()}
                    />
                    <ButtonIcon
                        style={styles.buttonAttachment}
                        icon={"clip"}
                        size={20}
                        iconStrokeColor={"#375274"}
                        iconStrokeWidth={2}
                        iconHeight={20}
                        iconWidth={20}
                        onPress={() => this.onAttachmentButtonPress()}
                    />
                </Animated.View>
                <Animated.View style={this._moreOptionsStyle()}>
                    <ButtonIcon
                        icon={"add"}
                        size={20}
                        iconStrokeColor={"#375274"}
                        iconStrokeWidth={2}
                        iconHeight={20}
                        iconWidth={20}
                        onPress={() => this.onMoreOptionsButtonPress()}
                    />
                </Animated.View>
                <TextArea
                    ref={el => (this.textAreaComponent = el)}
                    color={"grey"}
                    style={styles.textArea}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    multiline={this.props.multiline}
                    minHeight={this.props.textareaMinHeight}
                    maxHeight={this.props.textareaMaxHeight}
                    onValue={value => this.onTextAreaValue(value)}
                    onSubmit={() => this.onTextAreaSubmit()}
                    onFocus={() => this.onTextAreaFocus()}
                    onBlur={() => this.onTextAreaBlur()}
                />
                <ButtonIcon
                    style={styles.sendButton}
                    icon={"send"}
                    size={24}
                    iconStrokeColor={"#ffffff"}
                    iconFill={"#375274"}
                    iconStrokeWidth={0.5}
                    backgroundColor={"#ffffff"}
                    iconHeight={24}
                    iconWidth={24}
                    onPress={() => this.onSendButtonPress()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    richTextInput: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    textArea: {
        flex: 1,
        borderRadius: 20,
        marginRight: 15,
        marginLeft: 10
    },
    buttons: {
        alignItems: "center",
        flexDirection: "row"
    },
    moreOptions: {
        justifyContent: "center"
    },
    buttonAttachment: {
        marginLeft: 10
    }
});

export default RichTextInput;
