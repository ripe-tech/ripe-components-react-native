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
import ImagePicker from "react-native-image-picker";
import DocumentPicker from "react-native-document-picker";

import PropTypes from "prop-types";

import { ButtonIcon, TextArea } from "../..";

if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const animationTime = 350;

export class RichTextInput extends PureComponent {
    static get propTypes() {
        return {
            value: PropTypes.string,
            placeholder: PropTypes.string,
            multiline: PropTypes.bool,
            minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            onValue: PropTypes.func,
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
            minHeight: undefined,
            maxHeight: undefined,
            onValue: value => {},
            onPhotoAdded: source => {},
            onAttachmentsAdded: attachments => {},
            onSendMessage: text => {},
            onFocus: () => {},
            onBlur: () => {},
            style: {}
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.value) {
            return { value: props.value };
        }

        return null;
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

    startAnimations = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(animationTime, LayoutAnimation.Types.easeOut)
        );

        if (this.state.buttonsVisible) this.startShowButtonsAnimation();
        else this.startHideButtonsAnimation();
    };

    startShowButtonsAnimation = () => {
        Animated.parallel([
            Animated.timing(this.state.buttonsOpacityValue, {
                toValue: 1,
                duration: animationTime
            }),
            Animated.timing(this.state.moreOptionsOpacityValue, {
                toValue: 0,
                duration: animationTime
            })
        ]).start();
    };

    startHideButtonsAnimation = () => {
        Animated.parallel([
            Animated.timing(this.state.buttonsOpacityValue, {
                toValue: 0,
                duration: animationTime
            }),
            Animated.timing(this.state.moreOptionsOpacityValue, {
                toValue: 1,
                duration: animationTime
            })
        ]).start();
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

    onPhotoButtonPress = () => {
        ImagePicker.showImagePicker({}, response => {
            if (!response.didCancel && !response.error) {
                const source = { uri: response.uri };
                this.props.onPhotoAdded(source);
            }
        });
    };

    onAttachmentButtonPress = async () => {
        try {
            const attachments = await DocumentPicker.pickMultiple();
            this.props.onAttachmentsAdded(attachments);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) return;
            else throw err;
        }
    };

    onMoreOptionsButtonPress = () => {
        this.refs.textArea.blur();
    };

    onTextAreaValue = value => {
        this.setState({ value: value }, this.props.onValue(value));
    };

    onTextAreaFocus = () => {
        this.setState({ buttonsVisible: false }, () => this.startAnimations());

        this.props.onFocus();
    };

    onTextAreaBlur = () => {
        this.setState({ buttonsVisible: true }, () => this.startAnimations());

        this.props.onBlur();
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
                    ref="textArea"
                    style={styles.textArea}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    multiline={this.props.multiline}
                    minHeight={this.props.minHeight}
                    maxHeight={this.props.maxHeight}
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
