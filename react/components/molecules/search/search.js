import React, { PureComponent } from "react";
import { Animated, StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { ButtonIcon, TextArea } from "../../atoms";

export class Search extends PureComponent {
    static get propTypes() {
        return {
            value: PropTypes.string,
            placeholder: PropTypes.string,
            buttonProps: PropTypes.object,
            onFocus: PropTypes.func,
            onValue: PropTypes.func,
            onBlur: PropTypes.func,
            onClear: PropTypes.func,
            onSubmit: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            value: undefined,
            placeholder: undefined,
            buttonProps: {},
            onFocus: () => {},
            onValue: value => {},
            onBlur: () => {},
            onClear: () => {},
            onSubmit: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            buttonsVisible: true,
            focused: false
        };
    }

    setValue = (value, callback = () => {}) => this.setState({ value: value }, callback);

    focus = () => {
        this.textAreaComponent.focus();
    };

    blur = () => {
        this.textAreaComponent.blur();
    };

    sendMessage = () => {
        this.props.onSendMessage(this.state.value);
    };

    clear = () => {
        const emptyValue = "";
        this.setState({ value: emptyValue }, () => this.props.onValue(emptyValue));
        this.focus();
        this.props.onClear();
    };

    onTextAreaValue = value => {
        this.setState({ value: value });
        this.props.onValue(value);
    };

    onTextAreaFocus = () => {
        this.setState({ focused: true }, () => {
            this.props.onFocus();
        });
    };

    onTextAreaBlur = () => {
        this.setState({ focused: false }, () => {
            this.props.onBlur();
        });
    };

    onTextAreaSubmit = () => {
        this.setState({ focused: false }, () => {
            this.props.onSubmit();
        });
    };

    onButtonPress = () => {
        if (this.state.value) {
            this.clear();
        } else {
            this.props.onSubmit();
        }
    };

    _style = () => {
        return [styles.Search, this.props.style];
    };

    render() {
        return (
            <View style={this._style()}>
                <TextArea
                    ref={el => (this.textAreaComponent = el)}
                    color={"#223645"}
                    style={styles.textArea}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={"#223645"}
                    minHeight={40}
                    onValue={value => this.onTextAreaValue(value)}
                    onSubmit={() => this.onTextAreaSubmit()}
                    onFocus={() => this.onTextAreaFocus()}
                    onBlur={() => this.onTextAreaBlur()}
                />
                <ButtonIcon
                    style={styles.button}
                    icon={this.state.value ? "close" : "search"}
                    size={24}
                    iconStrokeColor={"#1d2631"}
                    iconStrokeWidth={2}
                    iconHeight={24}
                    iconWidth={24}
                    {...this.props.buttonProps}
                    onPress={() => this.onButtonPress()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Search: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative"
    },
    textArea: {
        flex: 1,
        paddingBottom: 0,
        paddingTop: 0,
        borderRadius: 6,
        backgroundColor: "#ffffff"
    },
    button: {
        position: "absolute",
        backgroundColor: "transparent",
        top: 13,
        right: 18
    }
});

export default Search;