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

    _stylesComputed() {
        const objectToReturn = { styles: { ...styles.touchable }, containerStyles: {} };

        if (!this.props.style) {
            return objectToReturn;
        }

        objectToReturn.containerStyles = this.props.style.flat(4).map(args => {
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
                height,
                ...rest
            } = args;

            objectToReturn.styles = {
                ...objectToReturn.styles,
                ...{
                    ...(position ? { position } : {}),
                    ...(top ? { top } : {}),
                    ...(bottom ? { bottom } : {}),
                    ...(left ? { left } : {}),
                    ...(right ? { right } : {}),
                    ...(borderRadius ? { borderRadius } : {}),
                    ...(width ? { width } : {}),
                    ...(height ? { height } : {})
                }
            };

            return { ...rest, ...(width ? { width } : {}), ...(height ? { height } : {}) };
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
