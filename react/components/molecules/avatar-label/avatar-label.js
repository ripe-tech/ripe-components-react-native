import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { Avatar } from "../../atoms";

export class AvatarLabel extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
            label: PropTypes.string,
            size: PropTypes.number,
            activeOpacity: PropTypes.number,
            borderRadius: PropTypes.number,
            resizeMode: PropTypes.string,
            hitSlop: PropTypes.shape({
                top: PropTypes.number.isRequired,
                left: PropTypes.number.isRequired,
                right: PropTypes.number.isRequired,
                bottom: PropTypes.number.isRequired
            }),
            onPress: PropTypes.func,
            onError: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            label: undefined,
            size: 40,
            onPress: PropTypes.func,
            onError: PropTypes.func,
            style: {}
        };
    }

    _text = () => {
        // shows text if no icon is provided or if
        // the user explicitly chooses
        return this.props.icon ? null : this.props.text;
    };

    _icon = () => {
        return this.state.valueData ? this.props.icon : this.props.iconSecondary || this.props.icon;
    };

    _color = () => {
        return (
            (this.state.valueData ? this.props.colorSecondary : this.props.color) ||
            this.props.color
        );
    };

    _contentColor = () => {
        // switches the icon color with the value color
        // when the button is not active
        return this.state.valueData ? "#ffffff" : this.props.colorSecondary || "#000000";
    };

    _style = () => {
        return [styles.avatarLabel, { width: this.props.size, height: this.props.size }];
    };

    _labelStyle = () => {
        return [styles.labelText, { fontSize: this.props.size / 4 }];
    };

    render() {
        return (
            <View style={this._style()}>
                <Avatar
                    image={this.props.image}
                    size={this.props.size}
                    borderRadius={this.props.borderRadius}
                    activeOpacity={this.props.activeOpacity}
                    resizeMode={this.props.resizeMode}
                    hitSlop={this.props.hitSlop}
                    onPress={this.props.onPress}
                    onError={this.props.onError}
                />
                <View style={styles.label}>
                    <Text style={this._labelStyle()}>{this.props.label}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avatarLabel: {
        overflow: "hidden"
    },
    label: {
        backgroundColor: "#000000",
        opacity: 0.4,
        position: "absolute",
        bottom: 0
    },
    labelText: {
        alignSelf: "center"
    }
});

export default AvatarLabel;
