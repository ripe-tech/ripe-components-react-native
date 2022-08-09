import React, { Component } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class Badge extends Component {
    static get propTypes() {
        return {
            text: PropTypes.string,
            count: PropTypes.number,
            countThreshold: PropTypes.number,
            hasAnimation: PropTypes.bool,
            animationDuration: PropTypes.number,
            backgroundColor: PropTypes.string,
            color: PropTypes.string,
            style: PropTypes.any,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            count: 0,
            countThreshold: 99,
            hasAnimation: true,
            animationDuration: 200,
            backgroundColor: "#597cf0",
            color: "#ffffff",
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count,
            scale: new Animated.Value(1),
            text: this.props.text
        };

        this.animating = false;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.count !== this.props.count || prevProps.text !== this.props.text) {
            this._animateCount();
        }
    }

    _animateCount() {
        if (this.props.hasAnimation && !this.animating) {
            this.animating = true;
            Animated.sequence([
                Animated.timing(this.state.scale, {
                    toValue: 1.1,
                    duration: this.props.animationDuration,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.scale, {
                    toValue: 1,
                    duration: this.props.animationDuration,
                    useNativeDriver: true
                })
            ]).start(() => {
                this.setState({
                    count: this.props.count,
                    text: this.props.text
                });
                this.animating = false;
            });
        } else {
            this.setState({
                count: this.props.count,
                text: this.props.text
            });
        }
    }

    _style = () => {
        return [
            styles.badge,
            {
                backgroundColor: this.props.backgroundColor,
                transform: [{ scale: this.state.scale }]
            },
            this.props.style
        ];
    };

    _getCount = () => {
        return this.state.count > this.props.countThreshold
            ? `${this.props.countThreshold}+`
            : this.state.count;
    };

    _textStyle = () => {
        return [
            styles.text,
            {
                color: this.props.color
            }
        ];
    };

    render() {
        return (
            <Animated.View style={this._style()}>
                <Text style={this._textStyle()}>
                    {this.state.text ? this.state.text : this._getCount()}
                </Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    badge: {
        borderRadius: 100,
        alignSelf: "flex-start",
        height: 17
    },
    text: {
        fontFamily: baseStyles.FONT_BOLD,
        fontSize: 13,
        fontWeight: "400",
        height: "100%",
        lineHeight: 17,
        textAlign: "center",
        width: "100%",
        paddingHorizontal: 8
    }
});

export default Badge;
