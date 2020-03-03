import React, { Component } from "react";
import { Animated, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class Badge extends Component {
    static get propTypes() {
        return {
            animationDuration: PropTypes.number,
            backgroundColor: PropTypes.string,
            borderRadius: PropTypes.number,
            color: PropTypes.string,
            count: PropTypes.number,
            style: ViewPropTypes.style,
            text: PropTypes.string
        };
    }

    static get defaultProps() {
        return {
            animationDuration: 200,
            backgroundColor: "#597cf0",
            borderRadius: 8,
            color: "#ffffff",
            count: 0,
            style: {},
            text: undefined
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count,
            scale: new Animated.Value(1),
            text: this.props.text
        };
    }

    componentWillReceiveProps(nextProps) {
        this._animateCount(nextProps.count, nextProps.text);
    }

    _animateCount(newCount, newText) {
        this.state.scale.stopAnimation();

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
        });
    }

    _style = () => {
        return [
            styles.badge,
            {
                backgroundColor: this.props.backgroundColor,
                borderRadius: this.props.borderRadius,
                transform: [{ scale: this.state.scale }]
            },
            this.props.style
        ];
    };

    _getNumericCount = () => {
        return this.state.count > 99 ? "99+" : this.state.count;
    };

    _getTextCount = () => {
        return this.state.text !== undefined ? this.state.text : null;
    };

    _getCount = () => {
        return this._getNumericCount() ? this._getNumericCount() : this._getTextCount();
    };

    _textStyle = () => {
        return [
            styles.text,
            {
                color: this.props.color,
                paddingHorizontal: this.state.count < 100 ? 7 : 3
            }
        ];
    };

    render() {
        return this._getCount() ? (
            <Animated.View style={this._style()}>
                <Text style={this._textStyle()}>
                    {this.state.text ? this._getTextCount() : this._getCount()}
                </Text>
            </Animated.View>
        ) : null;
    }
}

const styles = StyleSheet.create({
    badge: {
        height: 16
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
