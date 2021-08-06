import React, { PureComponent } from "react";
import { Animated, Platform, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { Link, Text } from "../../atoms";

export class ToastMessage extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            linkText: PropTypes.string,
            linkUrl: PropTypes.string,
            duration: PropTypes.number,
            animationDuration: PropTypes.number,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            linkText: undefined,
            linkUrl: undefined,
            duration: 5000,
            animationDuration: 300,
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            linkText: this.props.linkText,
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
                {this.props.linkText ? (
                    <Link
                        text={this.props.linkText}
                        url={this.props.linkUrl}
                        color={"blue"}
                        styleText={styles.linkText}
                        style={styles.link}
                    />
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
        paddingVertical: 10,
        marginHorizontal: 8
    },
    text: {
        flex: 1,
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: 16,
        paddingTop: Platform.OS === "ios" ? 4 : 0
    },
    link: {
        marginLeft: 20
    },
    linkText: {
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: 16,
        paddingTop: Platform.OS === "ios" ? 4 : 0
    }
});

export default ToastMessage;
