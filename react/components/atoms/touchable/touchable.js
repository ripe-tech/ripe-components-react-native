import React, { PureComponent } from "react";
import {
    ViewPropTypes,
    Platform,
    View,
    TouchableNativeFeedback,
    TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

const platform = Platform.OS;
const CustomTouchableComponent = platform === "ios" ? TouchableOpacity : TouchableNativeFeedback;

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
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            activeOpacity: undefined,
            disabled: undefined,
            hitSlop: undefined,
            useForeground: true,
            onLongPress: undefined,
            onPress: undefined,
            style: undefined
        };
    }

    _style() {
        if (platform === "ios") {
            return this.props.style;
        }

        return null;
    }

    _renderChildren() {
        return platform === "ios" ? (
            this.props.children
        ) : (
            <View style={this.props.style}>{this.props.children}</View>
        );
    }

    render() {
        return (
            <CustomTouchableComponent
                style={this._style()}
                activeOpacity={this.props.activeOpacity}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                hitSlop={this.props.hitSlop}
                useForeground={this.props.useForeground}
            >
                {this._renderChildren()}
            </CustomTouchableComponent>
        );
    }
}

export default Touchable;
