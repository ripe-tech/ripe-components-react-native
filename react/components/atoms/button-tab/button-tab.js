import React, { PureComponent } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import * as baseStyles from "../../../util/styles";

import { Icon } from "../icon";

export class ButtonTab extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            icon: PropTypes.string.isRequired,
            selected: PropTypes.bool,
            disabled: PropTypes.bool,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            style: ViewPropTypes.style,
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            selected: false,
            disabled: false,
            width: "100%",
            style: {},
            onPress: () => {}
        };
    }

    _containerStyles = () => {
        return [styles.container, { width: this.props.width }];
    };

    _iconColor = () => {
        return this.props.selected ? "#1d2631" : "#a6adb4";
    };

    _labelStyles = () => {
        return [styles.label, this.props.selected && styles.labelSelected];
    };

    render() {
        return (
            <TouchableWithoutFeedback
                style={this.props.style}
                disabled={this.props.disabled}
                onPress={this.props.onPress}
            >
                <View style={this._containerStyles()}>
                    {this.props.icon ? (
                        <Icon icon={this.props.icon} color={this._iconColor()} strokeWidth={2} />
                    ) : null}
                    {this.props.text ? (
                        <Text style={this._labelStyles()}>{this.props.text}</Text>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 4,
        paddingTop: 10,
        paddingBottom: 6
    },
    label: {
        color: "#a6adb4",
        fontSize: 10,
        fontWeight: "bold",
        lineHeight: 10,
        letterSpacing: 0.5,
        marginTop: 6,
        textAlign: "center",
        fontFamily: baseStyles.FONT
    },
    labelSelected: {
        color: "#1d2631"
    }
});
