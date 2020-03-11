import React, { PureComponent } from "react";
import { Animated, LayoutAnimation, StyleSheet, Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { Link } from "../../atoms";

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
            toastDuration: 1000,
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

    async componentDidMount() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    _animateShow() {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: this.props.animationDuration,
            useNativeDriver: true
        }).start();
    }

    _animateHide() {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: this.props.animationDuration,
            useNativeDriver: true
        }).start();
    }

    _stopPrevAnimations() {
        this.state.opacity.stopAnimation();
        this.state.opacity.setValue(0);
        if (this.state.toastTimeout) clearTimeout(this.state.toastTimeout);
    }

    show() {
        this._stopPrevAnimations();
        this._animateShow();
        this.state.toastTimeout = setTimeout(() => this._animateHide(), this.props.toastDuration);
    }

    hide() {
        clearTimeout(this.state.toastTimeout);
        this._animateHide();
    }

    _hasLink() {
        return this.props.linkText || this.props.linkText === 0;
    }

    _styleRoot = () => {
        return [
            styles.root,
            {
                opacity: this.state.opacity
            },
            this.props.style
        ];
    };

    _styleText = () => {
        const fullWidthStyle = {
            marginRight: 42
        };

        const sideWidthStyle = {
            width: "65%"
        };
        return [styles.text, this._hasLink() ? sideWidthStyle : fullWidthStyle, this.props.style];
    };

    render() {
        return (
            <Animated.View style={this._styleRoot()}>
                <Text style={this._styleText()}>{this.props.text}</Text>
                {this._hasLink() ? (
                    <Link text={this.props.linkText} url={this.props.linkUrl} style={styles.link} />
                ) : null}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 6,
        elevation: 5,
        flexDirection: "row",
        height: 60,
        justifyContent: "space-between",
        marginLeft: 6,
        marginRight: 6,
        shadowColor: "#384671",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1
    },
    text: {
        color: "#1d2631",
        marginLeft: 42
    },
    link: {
        color: "#597cf0",
        fontWeight: "bold",
        marginRight: 42,
        marginLeft: 10,
        textAlign: "center",
        textDecorationLine: "underline"
    }
});

export default ToastMessage;
