import React, { PureComponent } from "react";
import { Animated, LayoutAnimation, StyleSheet, Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { Link } from "../../atoms";

export class ToastMessage extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            linkText: PropTypes.string,
            link: PropTypes.string,
            animationTime: PropTypes.number,
            onPress: PropTypes.string,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            linkText: undefined,
            animationTime: 250,
            link: undefined,
            onPress: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0)
        };
    }

    async componentDidMount() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.animateShow();
    }

    animateShow() {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: this.props.animationTime,
            useNativeDriver: true
        }).start();
    }

    animateHide() {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: this.props.animationTime,
            useNativeDriver: true
        }).start();
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

    render() {
        return (
            <Animated.View style={this._styleRoot()} onPress={this.props.onPress}>
                <Text style={styles.text}>{this.props.text}</Text>
                {this.props.linkText ? (
                    <Link text={this.props.linkText} url={this.props.link} style={styles.link} />
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
        shadowColor: "rgba(59, 74, 116, 0.14)",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        paddingLeft: 42,
        color: "#1d2631"
    },
    link: {
        color: "#597cf0",
        paddingRight: 42,
        textDecorationLine: "underline",
        fontWeight: "bold"
    }
});

export default ToastMessage;
