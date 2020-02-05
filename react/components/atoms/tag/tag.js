import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "../../";

import PropTypes from "prop-types";

export class Tag extends PureComponent {
    _onPress = () => {
        const { onPress } = this.props;
        onPress();
    };

    _containerStyles = () => {
        const { variant } = this.props;
        const baseStyle = [styles.root];

        switch (variant) {
            case "active":
                baseStyle.push(styles.containerActive);
                break;
            case "disable":
                baseStyle.push(styles.containerDisable);
                break;

            default:
                break;
        }
        return baseStyle;
    };

    _textStyles = () => {
        const { variant } = this.props;
        const baseStyle = [styles.text];

        switch (variant) {
            case "active":
                baseStyle.push(styles.textActive);
                break;
            case "disable":
                baseStyle.push(styles.textDisable);
                break;

            default:
                break;
        }
        return baseStyle;
    };

    render() {
        const { text, icon, iconColor, width, height } = this.props;
        return (
            <TouchableOpacity style={this._containerStyles()} onPress={this._onPress}>
                <Icon icon={icon} color={iconColor} width={width} height={height} />
                <Text style={this._textStyles()}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 6
    },
    containerActive: {
        backgroundColor: "#84f1bb"
    },
    containerDisable: {
        borderWidth: 1,
        borderColor: "#e4e8f0",
        backgroundColor: "#ffffff"
    },
    text: {
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.23,
        marginLeft: 8
    },
    textActive: {
        color: "#24425a"
    },
    textDisable: {
        color: "#16425c"
    }
});

Tag.propTypes = {
    variant: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    icon: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    onPress: PropTypes.func.isRequired
};

Tag.defaultProps = {
    width: undefined,
    height: undefined
};
