import React, { PureComponent } from "react";
import { Dimensions, Animated, ViewPropTypes, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const screen = Dimensions.get("screen");

export class BarAnimated extends PureComponent {
    constructor(props) {
        super(props);

        this.generateItemWidth(props.numberOfItems);

        this.state = {
            xPosition: new Animated.Value(this._calculatePositionX())
        };
    }

    static get propTypes() {
        return {
            activeItem: PropTypes.number,
            color: PropTypes.string,
            numberOfItems: PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            activeItem: 0,
            color: "#597cf0",
            numberOfItems: 1,
            style: {}
        };
    }

    generateItemWidth(numberOfItems) {
        this.itemWidth = screen.width / numberOfItems;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.numberOfItems !== this.props.numberOfItems) {
            this.generateItemWidth(nextProps.numberOfItems);
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.activeItem !== this.props.activeItem ||
            prevProps.numberOfItems !== this.props.numberOfItems
        ) {
            this._startAnimations();
        }
    }

    _calculatePositionX() {
        return (
            this.itemWidth *
            (this.props.activeItem >= this.props.numberOfItems
                ? this.props.numberOfItems - 1
                : this.props.activeItem)
        );
    }

    _startAnimations() {
        this.state.xPosition.stopAnimation();

        Animated.spring(this.state.xPosition, {
            toValue: this._calculatePositionX(),
            useNativeDriver: true
        }).start();
    }

    _style() {
        return [
            styles.barAnimated,
            {
                backgroundColor: this.props.color,
                width: this.itemWidth,
                transform: [
                    {
                        translateX: this.state.xPosition
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
        position: "absolute",
        bottom: 0,
        height: 2
    }
});
