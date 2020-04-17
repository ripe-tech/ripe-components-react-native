import React, { PureComponent } from "react";

import {
    ViewPropTypes,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    TouchableNativeFeedback
} from "react-native";
import PropTypes from "prop-types";

const TouchableComponent = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

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

    _style = () => {
        return [Platform.OS === "ios" ? this.props.style : null];
    };

    _styleRoot = () => {
        return [styles.touchable, { borderRadius: this.props.borderRadius }];
    };

    render() {
        return (
            <View style={this._styleRoot()}>
                <TouchableComponent
                    style={this._style()}
                    activeOpacity={this.props.activeOpacity}
                    disabled={this.props.disabled}
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                    hitSlop={this.props.hitSlop}
                    useForeground={this.props.useForeground}
                >
                    {Platform.OS === "ios" ? (
                        this.props.children
                    ) : (
                        <View style={this.props.style}>{this.props.children}</View>
                    )}
                </TouchableComponent>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    touchable: {
        overflow: "hidden"
    }
});

export default Touchable;
