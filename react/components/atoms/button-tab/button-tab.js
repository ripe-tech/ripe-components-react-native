import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

export class ButtonTab extends PureComponent {
    _containerStyles = () => {
        const { selected } = this.props;
        return [styles.buttonTabContainer, selected && styles.buttonTabContainerSelected];
    };

    _image = () => {
        const { selected, icon, iconSelected } = this.props;
        return selected ? iconSelected || icon : icon;
    };

    _labelStyles = () => {
        const { selected } = this.props;
        return [styles.buttonTabLabel, selected && styles.buttonTabLabelSelected];
    };

    render() {
        const { text, onPress, disabled } = this.props;
        return (
            <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
                <View style={this._containerStyles()}>
                    <Image source={this._image()} />
                    <Text style={this._labelStyles()}>{text}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    buttonTabContainer: {
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
        borderRadius: 4
    },
    buttonTabContainerSelected: {
        backgroundColor: "rgba(102,135,246,0.11)"
    },
    buttonTabLabel: {
        fontSize: 11,
        lineHeight: 11,
        letterSpacing: 0.5,
        textAlign: "center",
        color: "#a6adb4"
    },
    buttonTabLabelSelected: {
        color: "#597cf0"
    }
});

ButtonTab.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.number.isRequired,
    iconSelected: PropTypes.number,
    selected: PropTypes.bool,
    onPress: PropTypes.func,
    disabled: PropTypes.bool
};
