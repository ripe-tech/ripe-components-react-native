import React, { PureComponent } from "react";
import { Animated, ViewPropTypes, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export class BarAnimated extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            offset: new Animated.Value(this.props.offset)
        };
    }

    static get propTypes() {
        return {
            offset: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            color: PropTypes.string,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            color: "#597cf0",
            style: {}
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.offset !== this.props.offset || prevProps.width !== this.props.width) {
            this._move();
        }
    }

    _move() {
        this.state.offset.stopAnimation();

        Animated.spring(this.state.offset, {
            toValue: this.props.offset,
            useNativeDriver: true
        }).start();
    }

    _style() {
        return [
            styles.barAnimated,
            {
                backgroundColor: this.props.color,
                width: this.props.width,
                transform: [
                    {
                        translateX: this.state.offset
                    }
                ]
            },
            this.props.style
        ];
    }

    render() {
        return <Animated.View style={this._style()} />;
    }
}

const styles = StyleSheet.create({
    barAnimated: {
        height: 2
    }
});