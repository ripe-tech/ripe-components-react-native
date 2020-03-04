import React, { Component } from "react";
import { Animated, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class Badge extends Component {
    static get propTypes() {
        return {
            text: PropTypes.string,
            count: PropTypes.number,
            countThreshold: PropTypes.number,
            hasAnimation: PropTypes.boolean,
            animationDuration: PropTypes.number,
            backgroundColor: PropTypes.string,
            color: PropTypes.string,
            style: ViewPropTypes.style
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
            style: {}
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

    componentWillUpdate(props, state) {
        if (props.count !== state.count || props.text !== state.text) {
            this._animateCount(props.count, props.text);
        }
    }

    _animateCount(newCount, newText) {
        if (this.props.hasAnimation && !this.animating) {
            this.animating = true;
            Animated.sequence([
                Animated.timing(this.state.scale, {
                    toValue: 1.1,
                    duration: this.props.animationDuration
                }),
                Animated.timing(this.state.scale, {
                    toValue: 1,
                    duration: this.props.animationDuration
                })
            ]).start(() => {
                this.setState({
                    count: newCount,
                    text: newText
                });
                this.animating = false;
            });
        } else {
            this.setState({
                count: newCount,
                text: newText
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
                color: this.props.color,
                paddingHorizontal: 8
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
        width: "100%"
    }
});

export default Badge;
