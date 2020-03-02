import React, { PureComponent } from "react";
import { Animated, StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class Badge extends PureComponent {
    static get propTypes() {
        return {
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
            opacity: new Animated.Value(1)
        };
    }

    becomeVisible = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500
        }).start();
    };

    becomeInvisible = () => {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 500
        }).start();
    };

    animateCount() {
        console.log("count was updated!");
        this.becomeInvisible();
        setTimeout(() => {
            this.becomeVisible();
        }, 500);
    }

    async componentDidUpdate() {
        if (this.props.count !== this.state.count || this.props.text !== this.state.text) {
            this.animateCount();
        }
        this.state.count = this.props.count;
        this.state.text = this.props.text;
    }

    _style = () => {
        return [
            styles.badge,
            {
                backgroundColor: this.props.backgroundColor,
                borderRadius: this.props.borderRadius,
                height: 16
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
            <View style={this._style()}>
                {this.state.text ? (
                    <Animated.Text style={this._textStyle()}>{this.state.text}</Animated.Text>
                ) : (
                    <Animated.Text style={this._textStyle()}>{this._getCount()}</Animated.Text>
                )}
            </View>
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
