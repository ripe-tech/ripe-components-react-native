import React, { PureComponent } from "react";
import { Animated, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { Link, Text } from "../../atoms";

export class ToastMessage extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            linkText: PropTypes.string,
            linkUrl: PropTypes.string,
            toastDuration: PropTypes.number,
            animationDuration: PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            linkText: undefined,
            linkUrl: undefined,
            toastDuration: 2000,
            animationDuration: 300,
            style: {}
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
        this.toastTimeout = setTimeout(() => this.hide(), this.props.toastDuration);
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
        elevation: 5,
        flexDirection: "row",
        shadowColor: "#384671",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        overflow: "hidden",
        paddingHorizontal: 22,
        paddingVertical: 18,
        marginHorizontal: 5
    },
    text: {
        flex: 1,
        color: "#1d2631"
    },
    link: {
        marginLeft: 20
    }
});

export default ToastMessage;
