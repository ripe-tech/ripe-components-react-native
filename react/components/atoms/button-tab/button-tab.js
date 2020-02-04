import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import { Icon } from "../icon/icon";

export class ButtonTab extends PureComponent {
    _containerStyles = () => {
        const { selected, width, style } = this.props;
        return [style, styles.container, { width: width }, selected && styles.containerSelected];
    };

    _iconColor = () => {
        return this.props.selected ? "#597cf0" : "#a6adb4";
    };

    _labelStyles = () => {
        const { selected } = this.props;
        return [styles.label, selected && styles.labelSelected];
    };

    render() {
        const { text, onPress, disabled } = this.props;
        return (
            <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
                <View style={this._containerStyles()}>
                    <Icon icon={this.props.icon} color={this._iconColor()} strokeWidth={2.5} />
                    <Text style={this._labelStyles()}>{text}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 4,
        paddingTop: 4,
        paddingBottom: 2
    },
    containerSelected: {
        backgroundColor: "#f2f4fe"
    },
    label: {
        color: "#a6adb4",
        fontSize: 11,
        lineHeight: 11,
        letterSpacing: 0.5,
        marginTop: 3,
        textAlign: "center"
    },
    labelSelected: {
        color: "#597cf0"
    }
});

ButtonTab.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
