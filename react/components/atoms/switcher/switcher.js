import React, { PureComponent } from "react";
import { StyleSheet, Text, Animated, View, Platform } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Touchable } from "../touchable";

export class Switcher extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            checked: PropTypes.bool,
            disabled: PropTypes.bool,
            checkedText: PropTypes.string,
            uncheckedText: PropTypes.string,
            variant: PropTypes.string,
            animationDuration: PropTypes.number,
            marginLeftValue: PropTypes.number,
            colorInputRangeValue: PropTypes.number,
            onValueUpdate: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            checked: false,
            disabled: false,
            variant: "colored",
            checkedText: null,
            uncheckedText: null,
            animationDuration: 200,
            marginLeftValue: 20,
            colorInputRangeValue: 150,
            onValueUpdate: () => {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            checkedData: this.props.checked,
            marginLeft: this.props.checked
                ? new Animated.Value(this.props.marginLeftValue)
                : new Animated.Value(0),
            backgroundColor: this.props.checked
                ? new Animated.Value(this.props.colorInputRangeValue)
                : new Animated.Value(0)
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.checked !== this.props.checked) {
            this._setChecked(this.props.checked);
        }
    }

    _getText() {
        return this.state.checkedData ? this.props.checkedText : this.props.uncheckedText;
    }

    _switcherStyle = () => {
        const isColored = this.props.variant === "colored";
        return [
            styles.switcher,
            {
                backgroundColor: this.state.backgroundColor.interpolate({
                    inputRange: [0, 150],
                    outputRange: ["#cccccc", isColored ? "#507bf8" : "#1d1d1d"]
                }),
                borderColor: this.state.backgroundColor.interpolate({
                    inputRange: [0, 150],
                    outputRange: ["#cccccc", isColored ? "#507bf8" : "#1d1d1d"]
                }),
                opacity: this.props.disabled ? 0.3 : 1
            }
        ];
    };

    _buttonStyle = () => {
        return [styles.button, { marginLeft: this.state.marginLeft }];
    };

    _setChecked = checked => {
        const marginLeftValue = checked ? 0 : this.props.marginLeftValue;
        const backgroundColor = checked ? 0 : this.props.colorInputRangeValue;
        Animated.parallel([
            Animated.timing(this.state.marginLeft, {
                toValue: marginLeftValue,
                duration: this.props.animationDuration,
                useNativeDriver: false
            }),
            Animated.timing(this.state.backgroundColor, {
                toValue: backgroundColor,
                duration: this.props.animationDuration,
                useNativeDriver: false
            })
        ]).start(() => {
            this.setState(
                prevState => ({ checkedData: !prevState.checkedData }),
                () => this.props.onValueUpdate(this.state.checkedData)
            );
        });
    };

    onPress = () => {
        this._setChecked(this.state.checkedData);
    };

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={this._switcherStyle()}>
                    <Touchable
                        onPress={this.onPress}
                        disabled={this.props.disabled}
                        activeOpacity={this.props.activeOpacity}
                        hitSlop={this.props.hitSlop}
                        {...this.id("switcher")}
                    >
                        <Animated.View style={this._buttonStyle()} />
                    </Touchable>
                </Animated.View>
                <Text style={styles.text}>{this._getText()}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    switcher: {
        display: "flex",
        borderWidth: 2,
        justifyContent: "center",
        height: 24,
        width: 44,
        borderRadius: 500
    },
    button: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#ffffff"
    },
    text: {
        paddingTop: Platform.OS === "ios" ? 1 : 0,
        fontFamily: baseStyles.FONT,
        alignSelf: "center",
        marginLeft: 5,
        minWidth: 75
    }
});

export default Switcher;
