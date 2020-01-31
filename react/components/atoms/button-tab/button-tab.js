import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

export class ButtonTab extends PureComponent {
    _containerStyles = () => {
        const { selected } = this.props;
        return [styles.buttonTabContainer, selected && styles.buttonTabContainerActive];
    };

    _imageToShow = () => {
        const { selected, activeImage, inactiveImage } = this.props;
        return selected ? activeImage : inactiveImage;
    };

    _labelStyles = () => {
        const { selected } = this.props;
        return [styles.buttonTabLabel, selected && styles.buttonTabLabelActive];
    };

    render() {
        const { label, onPress, disabled } = this.props;
        return (
            <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
                <View style={this._containerStyles()}>
                    <Image source={this._imageToShow()} />
                    <Text style={this._labelStyles()}>{label}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    buttonTabContainer: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
        borderRadius: 4,
        marginHorizontal: 4
    },
    buttonTabContainerActive: {
        backgroundColor: "rgba(102,135,246,0.11)"
    },
    buttonTabLabel: {
        fontSize: 11,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 11,
        letterSpacing: 0.24,
        textAlign: "center",
        color: "#a6adb4"
    },
    buttonTabLabelActive: {
        color: "#597cf0"
    }
});

ButtonTab.propTypes = {
    label: PropTypes.string.isRequired,
    activeImage: PropTypes.number.isRequired,
    inactiveImage: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};
