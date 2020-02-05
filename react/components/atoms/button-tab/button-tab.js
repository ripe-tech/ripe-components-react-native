import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import { Icon } from "../icon/icon";

export class ButtonTab extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            icon: PropTypes.string.isRequired,
            selected: PropTypes.bool,
            disabled: PropTypes.bool,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            text: null,
            selected: false,
            disabled: false,
            width: "100%",
            style: {},
            onPress: () => {}
        };
    }

    _containerStyles = () => {
        return [
            styles.container,
            { width: this.props.width },
            this.props.selected && styles.containerSelected
        ];
    };

    _iconColor = () => {
        return this.props.selected ? "#597cf0" : "#a6adb4";
    };

    _labelStyles = () => {
        return [styles.label, this.props && styles.labelSelected];
    };

    render() {
        return (
            <TouchableWithoutFeedback
                style={this.props.style}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
            >
                <View style={this._containerStyles()}>
                    <Icon icon={this.props.icon} color={this._iconColor()} strokeWidth={2.5} />
                    <Text style={this._labelStyles()}>{this.props.text}</Text>
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
