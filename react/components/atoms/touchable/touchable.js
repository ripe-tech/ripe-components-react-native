import React, { PureComponent } from "react";

import {
    ViewPropTypes,
    TouchableOpacity,
    View,
    TouchableNativeFeedback,
    Platform
} from "react-native";
import PropTypes from "prop-types";

const TouchableComponent = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

export class Touchable extends PureComponent {
    static get propTypes() {
        return {
            activeOpacity: PropTypes.number,
            disabled: PropTypes.bool,
            onLongPress: PropTypes.func,
            onPress: PropTypes.func,
            hitSlop: PropTypes.shape({
                top: PropTypes.number,
                left: PropTypes.number,
                right: PropTypes.number,
                bottom: PropTypes.number
            }),
            useForeground: PropTypes.bool,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            activeOpacity: undefined,
            disabled: undefined,
            onLongPress: undefined,
            onPress: undefined,
            hitSlop: undefined,
            useForeground: true,
            style: undefined
        };
    }

    _style = () => {
        return [Platform.OS === "ios" ? this.props.style : null];
    };

    render() {
        return (
            <TouchableComponent
                style={this._style()}
                activeOpacity={this.props.activeOpacity}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                hitSlop={this.props.hitSlop}
            >
                {Platform.OS === "ios" ? (
                    this.props.children
                ) : (
                    <View style={this.props.style}>{this.props.children}</View>
                )}
            </TouchableComponent>
        );
    }
}

export default Touchable;
