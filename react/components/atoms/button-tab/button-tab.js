import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { Icon } from "../icon";

export class ButtonTab extends PureComponent {
    state = {
        pressed: false
    };

    static get propTypes() {
        return {
            text: PropTypes.string,
            icon: PropTypes.string,
            selected: PropTypes.bool,
            disabled: PropTypes.bool,
            style: ViewPropTypes.style,
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            selected: false,
            disabled: false,
            style: {},
            onPress: () => {}
        };
    }

    _iconColor = () => {
        return this.props.selected || this.state.pressed ? "#1d2631" : "#a6adb4";
    };

    _labelStyle = () => {
        return [
            styles.label,
            this.props.selected || this.state.pressed ? styles.labelSelected : {}
        ];
    };

    _onPressIn = () => {
        this.setState({ pressed: true });
    };

    _onPressOut = () => {
        this.setState({ pressed: false });
    };

    render() {
        return (
            <TouchableWithoutFeedback
                style={this.props.style}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
                onPressIn={this._onPressIn}
                onPressOut={this._onPressOut}
            >
                <View style={styles.container}>
                    {this.props.icon ? (
                        <Icon icon={this.props.icon} color={this._iconColor()} strokeWidth={2.5} />
                    ) : null}
                    {this.props.text ? (
                        <Text style={this._labelStyle()}>{this.props.text}</Text>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        borderRadius: 4,
        paddingTop: 10,
        paddingBottom: 6
    },
    label: {
        color: "#a6adb4",
        fontSize: 10,
        fontFamily: baseStyles.FONT_BOOK,
        lineHeight: 10,
        marginTop: 6,
        textAlign: "center"
    },
    labelSelected: {
        color: "#1d2631"
    }
});

export default ButtonTab;
