import React, { PureComponent } from "react";
import { Animated, StyleSheet, ViewPropTypes, Platform } from "react-native";
import PropTypes from "prop-types";

import { baseStyles, Touchable, Text } from "ripe-components-react-native";

export class SnackbarIos extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            actionText: PropTypes.string,
            duration: PropTypes.number,
            animationDuration: PropTypes.number,
            onActionPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            actionText: undefined,
            duration: 5000,
            animationDuration: 300,
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            actionText: this.props.actionText,
            animationDuration: this.props.animationDuration,
            opacity: new Animated.Value(0),
            toastTimeout: null
        };
    }

    _stopPrevAnimations() {
        this.state.opacity.stopAnimation();
        this.state.opacity.setValue(0);
        clearTimeout(this.toastTimeout);
    }

    show() {
        this._stopPrevAnimations();
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: this.props.animationDuration,
            useNativeDriver: true
        }).start();
        this.toastTimeout = setTimeout(() => this.hide(), this.props.duration);
    }

    hide() {
        clearTimeout(this.toastTimeout);
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: this.props.animationDuration,
            useNativeDriver: true
        }).start();
    }

    _style = () => {
        return [
            styles.toast,
            {
                opacity: this.state.opacity
            },
            this.props.style
        ];
    };

    render() {
        return (
            <Animated.View style={this._style()}>
                <Text style={styles.text}>{this.props.text}</Text>
                {this.props.actionText ? (
                    <Touchable
                        style={styles.action}
                    >
                        <Text style={styles.actionText}>{this.props.actionText}</Text>
                    </Touchable>
                ) : null}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    toast: {
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
