import React, { Component } from "react";
import { Animated, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class Badge extends Component {
    static get propTypes() {
        return {
            backgroundColor: PropTypes.string,
            borderRadius: PropTypes.number,
            animationDuration: PropTypes.number,
            color: PropTypes.string,
            count: PropTypes.number,
            style: ViewPropTypes.style,
            text: PropTypes.string
        };
    }

    static get defaultProps() {
        return {
            animationDuration: 300,
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
            text: this.props.text,
            incomingCount: null,
            incomingText: null,
            opacity: new Animated.Value(1),
            scale: new Animated.Value(1)
        };
    }

    animateCount = (newCount, nextText) => {
        this.stopPreviousAnimations();
        Animated.timing(this.state.opacity, {
            toValue: 0.2,
            duration: this.props.animationDuration
        }).start(() => {
            this.setState(
                {
                    count: newCount,
                    text: nextText
                },
                () => {
                    Animated.timing(this.state.opacity, {
                        toValue: 1,
                        duration: this.props.animationDuration
                    }).start(
                        this.animateBadge(() => {
                            console.log("done");
                        })
                    );
                }
            );
        });
    };

    stopPreviousAnimations() {
        this.state.opacity.stopAnimation();
        this.state.scale.stopAnimation();
    }

    animateBadge() {
        Animated.timing(this.state.scale, {
            toValue: 1.1,
            duration: this.props.animationDuration
        }).start(() => {
            Animated.timing(this.state.scale, {
                toValue: 1,
                duration: this.props.animationDuration
            }).start();
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.count !== this.state.count || nextProps.text !== this.state.text) {
            this.animateCount(nextProps.count, nextProps.text);
            console.log("inside componentWillReceiveProps");
        }
    }

    async componentDidMount() {
        this.continuousUpdate();
    }

    continuousUpdate() {
        setTimeout(() => {
            this.animateCount(this.state.count + 1);
            this.continuousUpdate();
        }, 200);
    }

    updateState(newProps) {
        this.state.incomingCount = newProps.count;
        this.animateCount();
    }

    _style = () => {
        return [
            styles.badge,
            {
                backgroundColor: this.props.backgroundColor,
                borderRadius: this.props.borderRadius,
                height: 16,
                width: 22,
                scale: 0,
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
                lineHeight: 17,
                opacity: this.state.opacity,
                paddingHorizontal: this.state.count < 100 ? 7 : 3
            }
        ];
    };

    render() {
        return this._getCount() ? (
            <Animated.View style={this._style()}>
                <Animated.Text style={this._textStyle()}>{this.state.count}</Animated.Text>
            </Animated.View>
        ) : null;
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: baseStyles.FONT_BOLD,
        fontSize: 13,
        textAlign: "center",
        fontWeight: "400",
        height: "100%",
        width: "100%"
    }
});

export default Badge;
