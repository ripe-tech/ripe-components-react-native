import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, Platform, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles, capitalize } from "../../../util";

import { Icon } from "../icon";

export class ButtonKeyboard extends PureComponent {
    static get propTypes() {
        return {
            icon: PropTypes.string,
            strokeWidth: PropTypes.number,
            text: PropTypes.string,
            value: PropTypes.any,
            variant: PropTypes.string,
            onPress: PropTypes.func,
            onLongPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            icon: undefined,
            strokeWidth: undefined,
            text: undefined,
            value: undefined,
            variant: undefined,
            onPress: () => {},
            onLongPress: () => {},
            style: {}
        };
    }

    _onPress = () => {
        this.props.onPress(this.props.value);
    };

    _onLongPress = () => {
        this.props.onLongPress(this.props.value);
    };

    _style = () => {
        return [
            styles.buttonKeyboard,
            styles[`buttonKeyboard${capitalize(this.props.variant)}`],
            this.props.style
        ];
    };

    render() {
        return (
            <TouchableOpacity
                style={this._style()}
                onPress={this._onPress}
                onLongPress={this._onLongPress}
            >
                {this.props.text ? <Text style={styles.text}>{this.props.text}</Text> : null}
                {this.props.icon ? (
                    <Icon
                        icon={this.props.icon}
                        strokeWidth={this.props.strokeWidth}
                        color="#17425c"
                    />
                ) : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonKeyboard: {
        flex: 1,
        maxHeight: 54,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: 5,
        elevation: 2,
        shadowColor: "rgb(159, 170, 202)",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    buttonKeyboardClean: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0
    },
    text: {
        fontSize: 28,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.47,
        textAlign: "center",
        color: "#17425c",
        fontFamily: baseStyles.FONT,
        marginTop: Platform.OS === "ios" ? 4 : 0
    }
});

export default ButtonKeyboard;
