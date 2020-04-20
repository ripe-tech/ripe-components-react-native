import React, { PureComponent } from "react";

import { ViewPropTypes, StyleSheet, View, TouchableNativeFeedback } from "react-native";
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

    _validateField(field) {
        return field !== null && field !== undefined;
    }

    _stylesComputed() {
        const objectToReturn = { styles: { ...styles.touchable }, containerStyles: {} };
        let style = this.props.style;

        if (!style) {
            return objectToReturn;
        }

        if (typeof style === "object") {
            style = [style];
        }

        objectToReturn.containerStyles = style.flat(Infinity).map(args => {
            if (!args) {
                return;
            }

            const {
                position,
                top,
                bottom,
                left,
                right,
                borderRadius,
                width,
                maxWidth,
                height,
                maxHeight,
                marginRight,
                marginLeft,
                marginTop,
                marginBottom,
                marginHorizontal,
                marginVertical,
                marginEnd,
                marginStart,
                margin,
                flex,
                elevation,
                alignSelf,
                zIndex,
                ...rest
            } = args;

            objectToReturn.styles = {
                ...objectToReturn.styles,
                ...{
                    ...(position ? { position } : {}),
                    ...(this._validateField(top) ? { top } : {}),
                    ...(this._validateField(bottom) ? { bottom } : {}),
                    ...(this._validateField(left) ? { left } : {}),
                    ...(this._validateField(right) ? { right } : {}),
                    ...(this._validateField(borderRadius) ? { borderRadius } : {}),
                    ...(this._validateField(width) ? { width } : {}),
                    ...(this._validateField(height) ? { height } : {}),
                    ...(this._validateField(marginRight) ? { marginRight } : {}),
                    ...(this._validateField(marginLeft) ? { marginLeft } : {}),
                    ...(this._validateField(marginTop) ? { marginTop } : {}),
                    ...(this._validateField(marginBottom) ? { marginBottom } : {}),
                    ...(this._validateField(marginHorizontal) ? { marginHorizontal } : {}),
                    ...(this._validateField(marginVertical) ? { marginVertical } : {}),
                    ...(this._validateField(marginStart) ? { marginStart } : {}),
                    ...(this._validateField(marginEnd) ? { marginEnd } : {}),
                    ...(this._validateField(margin) ? { margin } : {}),
                    ...(this._validateField(flex) ? { flex } : {}),
                    ...(this._validateField(maxWidth) ? { maxWidth } : {}),
                    ...(this._validateField(maxHeight) ? { maxHeight } : {}),
                    ...(this._validateField(elevation) ? { elevation } : {}),
                    ...(alignSelf ? { alignSelf } : {}),
                    ...(this._validateField(zIndex) ? { zIndex } : {})
                }
            };

            return {
                ...rest,
                ...(this._validateField(width) ? { width } : {}),
                ...(this._validateField(height) ? { height } : {}),
                ...(this._validateField(maxHeight) ? { maxHeight } : {}),
                ...(this._validateField(maxWidth) ? { maxWidth } : {})
            };
        });

        return objectToReturn;
    }

    render() {
        const _styles = this._stylesComputed();

        return (
            <View style={_styles.styles}>
                <TouchableNativeFeedback
                    activeOpacity={this.props.activeOpacity}
                    disabled={this.props.disabled}
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                    hitSlop={this.props.hitSlop}
                    useForeground={this.props.useForeground}
                >
                    <View style={_styles.containerStyles}>{this.props.children}</View>
                </TouchableNativeFeedback>
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
