import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "../../";
import PropTypes from "prop-types";

export class ButtonKeyboard extends PureComponent {
    _containerStyle = () => {
        const { variant, style } = this.props;
        const baseStyle = [styles.root, style];

        switch (variant) {
            case "clean":
                baseStyle.push(styles.variantCleanContainer);
                break;
            default:
                break;
        }
        return baseStyle;
    };
    _onPress = () => {
        const { onPress, value } = this.props;
        onPress(value);
    };
    render() {
        const { text, icon } = this.props;
        return (
            <TouchableOpacity style={this._containerStyle()} onPress={this._onPress}>
                {text ? <Text style={styles.text}>{text}</Text> : null}
                {icon ? <Icon icon={icon} color="#17425c" width={28} height={28} /> : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        maxHeight: 54,
        marginHorizontal: 2,
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
    variantCleanContainer: {
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
        color: "#17425c"
    }
});

ButtonKeyboard.propTypes = {
    style: ViewPropTypes.style,
    onPress: PropTypes.func,
    icon: PropTypes.string,
    text: PropTypes.string,
    variant: PropTypes.string,
    value: PropTypes.any
};

ButtonKeyboard.defaultProps = {
    style: {},
    onPress: () => {},
    icon: null,
    text: null,
    variant: null,
    value: null
};
