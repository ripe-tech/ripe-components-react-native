import React, { PureComponent } from "react";
import { Animated, Platform, StyleSheet, Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { baseStyles, IdentifiableMixin } from "../../../util";

import { Touchable } from "../../atoms";

export class Snackbar extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            text: PropTypes.string,
            actionText: PropTypes.string,
            showDuration: PropTypes.number,
            animationDuration: PropTypes.number,
            onActionPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            actionText: undefined,
            showDuration: 5000,
            animationDuration: 300,
            onActionPress: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0),
            snackbarTimeout: null
        };
    }

    _stopPrevAnimations = () => {
        this.state.opacity.stopAnimation();
        this.state.opacity.setValue(0);
        clearTimeout(this.snackbarTimeout);
    };

    show = () => {
        this._stopPrevAnimations();
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: this.props.animationDuration,
            useNativeDriver: true
        }).start();
        this.snackbarTimeout = setTimeout(this.hide, this.props.showDuration);
    };

    hide = () => {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: this.props.animationDuration,
            useNativeDriver: true
        }).start();
    };

    _onActionPress = () => {
        this.hide();
        if (this.props.onActionPress) this.props.onActionPress();
    };

    _style = () => {
        return [
            styles.snackbar,
            {
                opacity: this.state.opacity
            },
            this.props.style
        ];
    };

    render() {
        return (
            <Animated.View style={this._style()} {...this.id("snackbar-ios")}>
                <Text style={styles.text}>{this.props.text}</Text>
                {this.props.actionText && (
                    <Touchable onPress={this._onActionPress()} style={styles.action}>
                        <Text style={styles.actionText}>{this.props.actionText}</Text>
                    </Touchable>
                )}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    snackbar: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 6,
        elevation: 3,
        flexDirection: "row",
        shadowColor: "#8d8d8d",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        paddingHorizontal: 18,
        paddingVertical: 14,
        marginHorizontal: 8
    },
    text: {
        flex: 1,
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: 16,
        color: "#223645",
        paddingTop: Platform.OS === "ios" ? 4 : 0
    },
    action: {
        marginLeft: 20
    },
    actionText: {
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: 16,
        color: "#4f7af8",
        paddingTop: Platform.OS === "ios" ? 4 : 0
    }
});

export default SnackbarIos;
