import React, { PureComponent } from "react";
import { ViewPropTypes, View, TouchableNativeFeedback } from "react-native";
import PropTypes from "prop-types";

export class Touchable extends PureComponent {
    static get propTypes() {
        return {
            activeOpacity: PropTypes.number,
            borderRadius: PropTypes.number,
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
            borderRadius: undefined,
            disabled: undefined,
            onLongPress: undefined,
            onPress: undefined,
            hitSlop: undefined,
            useForeground: true,
            style: undefined
        };
    }

    render() {
        return (
            <TouchableNativeFeedback
                activeOpacity={this.props.activeOpacity}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                hitSlop={this.props.hitSlop}
                useForeground={this.props.useForeground}
            >
                <View style={this.props.style}>{this.props.children}</View>
            </TouchableNativeFeedback>
        );
    }
}

export default Touchable;
