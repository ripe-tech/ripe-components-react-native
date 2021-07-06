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
            label: PropTypes.string.isRequired,
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
            size: 40,
            borderRadius: 100,
            onPress: PropTypes.func,
            onError: PropTypes.func,
            style: {}
        };
    }

    _style = () => {
        return [
            styles.avatarLabel,
            {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.borderRadius
            }
        ];
    };

    _labelStyle = () => {
        return [styles.label, { height: this.props.size / 3 }];
    };

    _labelTextStyle = () => {
        return [styles.labelText, { fontSize: this.props.size / 6 }];
    };

    render() {
        return (
            <View style={this._style()}>
                <Avatar
                    image={this.props.image}
                    size={this.props.size}
                    borderRadius={0}
                    activeOpacity={this.props.activeOpacity}
                    resizeMode={this.props.resizeMode}
                    hitSlop={this.props.hitSlop}
                    onPress={this.props.onPress}
                    onError={this.props.onError}
                />
                <View style={this._labelStyle()} />
                <Text style={this._labelTextStyle()}>{this.props.label}</Text>
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
        width: "100%",
        opacity: 0.5,
        position: "absolute",
        bottom: 0
    },
    labelText: {
        alignSelf: "center",
        color: "#ffffff",
        position: "absolute",
        bottom: "7%"
    }
});

export default AvatarLabel;
