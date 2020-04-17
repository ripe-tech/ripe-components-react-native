import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import { Icon } from "../icon";
import { Touchable } from "../touchable";

export class ButtonIcon extends PureComponent {
    static get propTypes() {
        return {
            icon: PropTypes.string.isRequired,
            size: PropTypes.number.isRequired,
            backgroundColor: PropTypes.string,
            iconFill: PropTypes.string,
            iconHeight: PropTypes.number,
            iconWidth: PropTypes.number,
            iconStrokeColor: PropTypes.string,
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
            size: 30,
            backgroundColor: "#ffffff",
            iconFill: undefined,
            iconHeight: 20,
            iconWidth: 20,
            iconStrokeColor: "#000000",
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
            {
                width: this.props.size,
                height: this.props.size,
            },
            this.props.style
        ];
    }

    _touchableStyle = () => {
        return [
            styles.buttonIcon,
            {
                backgroundColor: this.props.backgroundColor,
            }
        ];
    }

    render() {
        return (
            <View style={this._style()}>
                <Touchable
                    onPress={this.props.onPress}
                    borderRadius={this.props.size / 2}
                    disabled={!this.props.onPress}
                    style={this._touchableStyle()}
                >
                    <Icon
                        icon={this.props.icon}
                        color={this.props.iconStrokeColor}
                        fill={this.props.iconFill}
                        width={this.props.iconWidth}
                        height={this.props.iconHeight}
                        strokeWidth={this.props.iconStrokeWidth}
                    />
                </Touchable>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    }
});

export default ButtonIcon;
