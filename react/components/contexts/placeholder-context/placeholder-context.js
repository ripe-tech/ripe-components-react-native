import React, { Component } from "react";
import PropTypes from "prop-types";

export const PlaceholderContext = React.createContext({
    placeholderLocations: [0, 0, 0],
    placeholderColors: ["#DBDEE5", "#E3E6ED", "#DBDEE5"]
});

export class PlaceholderProvider extends Component {
    static get propTypes() {
        return {
            step: PropTypes.number,
            distance: PropTypes.number,
            frequency: PropTypes.number,
            placeholderColors: PropTypes.arrayOf(PropTypes.string)
        };
    }

    static get defaultProps() {
        return {
            step: 10,
            distance: 30,
            frequency: 40,
            placeholderColors: ["#DBDEE5", "#E3E6ED", "#DBDEE5"]
        };
    }

    constructor(props) {
        super(props);

        this.timeoutAnimation = null;

        this.state = {
            thirdGradientLocation: 0,
            placeholderLocations: [0, 0, 0]
        };
    }

    componentDidMount() {
        this.startAnimation();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutAnimation);
    }

    startAnimation = () => {
        this.timeoutAnimation = setTimeout(() => {
            this.setState(state => {
                const thirdPos =
                    (state.thirdGradientLocation + this.props.step) %
                    (100 + this.props.distance * 2);
                const secondPos = thirdPos - this.props.distance;
                const firstPos = secondPos - this.props.distance;

                return {
                    thirdGradientLocation: thirdPos,
                    placeholderLocations: [
                        this.forceBounds(firstPos),
                        this.forceBounds(secondPos),
                        this.forceBounds(thirdPos)
                    ]
                };
            }, this.startAnimation);
        }, this.props.frequency);
    };

    forceBounds(nr) {
        return Math.min(100, Math.max(nr, 0)) / 100;
    }

    render() {
        return (
            <PlaceholderContext.Provider
                value={{
                    placeholderLocations: this.state.placeholderLocations,
                    placeholderColors: this.props.placeholderColors
                }}
            >
                {this.props.children}
            </PlaceholderContext.Provider>
        );
    }
}
