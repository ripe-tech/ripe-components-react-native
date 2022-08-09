import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";
import { capitalize, isTabletSize } from "ripe-commons-native";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Icon } from "../icon";
import { Touchable } from "../touchable";

export class ButtonKeyboard extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            icon: PropTypes.string,
            strokeWidth: PropTypes.number,
            text: PropTypes.string,
            value: PropTypes.any,
            variant: PropTypes.string,
            onPress: PropTypes.func,
            onLongPress: PropTypes.func,
            style: PropTypes.any,
            styles: PropTypes.any
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
            style: {},
            styles: styles
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
            <Touchable
                style={this._style()}
                onPress={this._onPress}
                onLongPress={this._onLongPress}
            >
                {this.props.text ? (
                    <Text style={styles.text} {...this.id(`button-keyboard-${this.props.text}`)}>
                        {this.props.text}
                    </Text>
                ) : null}
                {this.props.icon ? (
                    <Icon
                        icon={this.props.icon}
                        strokeWidth={this.props.strokeWidth}
                        color="#17425c"
                        {...this.id(`button-keyboard-${this.props.icon}`)}
                    />
                ) : null}
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    buttonKeyboard: {
        overflow: Platform.OS === "ios" ? "visible" : "hidden",
        flex: 1,
        maxHeight: isTabletSize() ? 80 : 54,
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
