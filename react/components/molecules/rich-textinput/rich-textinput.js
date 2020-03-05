import React, { PureComponent } from "react";
import {
    StyleSheet,
    ViewPropTypes,
    View,
    Animated,
    Platform,
    UIManager,
    LayoutAnimation
} from "react-native";

import PropTypes from "prop-types";

import { ButtonIcon, TextArea } from "../..";
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

        if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

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
        const value = this.state.value;
        this.setState({ value: undefined }, () => this.props.onSendMessage(value));
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

    render() {
        return (
            <View style={[styles.richTextInput, this.props.style]}>
                <Animated.View
                    style={this._buttonsStyle()}
                    pointerEvents={this.state.buttonsVisible ? undefined : "none"}
                >
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
                </Animated.View>
                <Animated.View style={this._moreOptionsStyle()}>
                    <ButtonIcon
                        icon={"add"}
                        size={32}
                        color={"#375274"}
                        backgroundColor={"#ffffff"}
                        iconHeight={28}
                        iconWidth={28}
                        onPress={() => this.onMoreOptionsButtonPress()}
                    />
                </Animated.View>
                <TextArea
                    ref={el => (this.textAreaComponent = el)}
                    style={styles.textArea}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    multiline={this.props.multiline}
                    textareaMinHeight={this.props.textareaMinHeight}
                    textareaMaxHeight={this.props.textareaMaxHeight}
                    onValue={value => this.onTextAreaValue(value)}
                    onFocus={() => this.onTextAreaFocus()}
                    onBlur={() => this.onTextAreaBlur()}
                />
                <ButtonIcon
                    style={styles.sendButton}
                    icon={"send"}
                    size={32}
                    color={"#375274"}
                    backgroundColor={"#ffffff"}
                    iconHeight={27}
                    iconWidth={27}
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
        paddingTop: 8,
        paddingBottom: 8
    },
    textArea: {
        flex: 1,
        backgroundColor: "#f6f7f9",
        borderRadius: 20
    },
    buttons: {
        flexDirection: "row",
        alignSelf: "flex-end",
        paddingLeft: 5,
        paddingRight: 5
    },
    moreOptions: {
        alignSelf: "flex-end"
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