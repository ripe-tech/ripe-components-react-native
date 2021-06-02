import React, { PureComponent } from "react";
import {
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
    ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

export class Touchable extends PureComponent {
    static get propTypes() {
        return {
            activeOpacity: PropTypes.number,
            disabled: PropTypes.bool,
            hitSlop: PropTypes.shape({
                top: PropTypes.number,
                left: PropTypes.number,
                right: PropTypes.number,
                bottom: PropTypes.number
            }),
            useForeground: PropTypes.bool,
            onLongPress: PropTypes.func,
            onPress: PropTypes.func,
            onPressIn: PropTypes.func,
            onPressOut: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            disabled: undefined,
            hitSlop: undefined,
            onLongPress: undefined,
            onPress: undefined,
            onPressIn: undefined,
            onPressOut: undefined,
            style: undefined,
            activeOpacity: undefined,
            useForeground: true
        };
    }

    render() {
        if (Platform.OS === "ios") {
            return (
                <TouchableOpacity
                    style={this.props.style}
                    activeOpacity={this.props.activeOpacity}
                    disabled={this.props.disabled}
                    onPress={this.props.onPress}
                    onPressIn={this.props.onPressIn}
                    onPressOut={this.props.onPressOut}
                    onLongPress={this.props.onLongPress}
                    hitSlop={this.props.hitSlop}
                >
                    {this.props.children}
                </TouchableOpacity>
            );
        }
        return (
            <TouchableNativeFeedback
                disabled={this.props.disabled}
                onPress={this.props.onPress}
                onPressIn={this.props.onPressIn}
                onPressOut={this.props.onPressOut}
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
