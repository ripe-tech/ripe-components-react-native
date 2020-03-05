import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, Platform, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

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
            style: {},
            onPress: () => {}
        };
    }

    _onPress = () => {
        this.props.onPress(this.props.value);
    };

    _style = () => {
        const base = [styles.buttonKeyboard, this.props.style];
        switch (this.props.variant) {
            case "clean":
                base.push(styles.cleanStyle);
                break;
            default:
                break;
        }
        return base;
    };

    render() {
        return (
            <TouchableOpacity style={this._style()} onPress={this._onPress}>
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
    cleanStyle: {
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
