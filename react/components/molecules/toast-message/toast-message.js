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
            animationDuration: PropTypes.number,
            duration:  PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            linkText: undefined,
            animationDuration: 300,
            duration: 1000,
            linkUrl: undefined,
            style: {}
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
            text: this.props.text,
            animationDuration: this.props.animationDuration,
            timeout: null,
            linkText: this.props.linkText,
        };
    }

    async componentDidMount() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    animateShow(duration) {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: duration || this.props.animationDuration,
            useNativeDriver: true
        }).start();
    }

    animateHide(duration) {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: duration || this.props.animationDuration,
            useNativeDriver: true
        }).start();
    }

    show(){
        console.log("yooo");
        this.state.opacity.stopAnimation();
        this.state.opacity.setValue(0);
        if (this.state.timeout) clearTimeout(this.state.timeout);
        console.log(this.state.timeout);
        this.animateShow();
        this.state.timeout = setTimeout(() => this.animateHide(), this.props.duration)
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
        return [
            styles.text,
            this._hasLink() ? sideWidthStyle: fullWidthStyle,
            this.props.style
        ];
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
        backgroundColor: "#ffffff",
        marginLeft: 6,
        marginRight: 6,
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 6,
        shadowColor: "#384671",
        elevation: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        marginLeft: 42,
        color: "#1d2631"
    },
    link: {
        color: "#597cf0",
        marginRight: 42,
        marginLeft: 10,
        textAlign: "center",
        textDecorationLine: "underline",
        fontWeight: "bold"
    }
});

export default ToastMessage;
