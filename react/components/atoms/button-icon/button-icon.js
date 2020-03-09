import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { Icon } from "../icon";

export class ButtonIcon extends PureComponent {
    static get propTypes() {
        return {
            icon: PropTypes.string.isRequired,
            size: PropTypes.number.isRequired,
            backgroundColor: PropTypes.string,
            color: PropTypes.string,
            iconHeight: PropTypes.number,
            iconWidth: PropTypes.number,
            iconStrokeWidth: PropTypes.number,
            hitBox: PropTypes.shape({
                top: PropTypes.number,
                right: PropTypes.number,
                bottom: PropTypes.number,
                left: PropTypes.number
            }),
            onPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            backgroundColor: "#ffffff",
            color: "#000000",
            iconHeight: 20,
            iconWidth: 20,
            iconStrokeWidth: 1,
            hitBox: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            },
            onPress: undefined,
            style: {}
        };
    }

    _style() {
        return [
            styles.buttonIcon,
            {
                borderRadius: this.props.size / 2,
                backgroundColor: this.props.backgroundColor,
                width: this.props.size,
                height: this.props.size
            },
            this.props.style
        ];
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                disabled={!this.props.onPress}
                style={this._style()}
            >
                <Icon
                    icon={this.props.icon}
                    color={this.props.color}
                    width={this.props.iconWidth}
                    height={this.props.iconHeight}
                    strokeWidth={this.props.iconStrokeWidth}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonIcon: {
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ButtonIcon;
