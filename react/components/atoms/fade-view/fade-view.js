import React, { Component } from "react";
import { Animated } from "react-native";
import PropTypes from "prop-types";

export class FadeView extends Component {
    state = {
        viewOpacity: new Animated.Value(0)
    };

    static get propTypes() {
        return {
            onFadeComplete: PropTypes.func,
            duration: PropTypes.number,
            style: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
                PropTypes.object,
                PropTypes.array
            ]),
            children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
        };
    }

    static get defaultProps() {
        return {
            duration: 500
        };
    }

    componentDidMount() {
        Animated.timing(this.state.viewOpacity, {
            toValue: 1,
            duration: this.props.duration
        }).start(this.props.onFadeComplete || (() => {}));
    }

    render() {
        return (
            <Animated.View
                style={[{ opacity: this.state.viewOpacity }].concat(this.props.style || [])}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default FadeView;
