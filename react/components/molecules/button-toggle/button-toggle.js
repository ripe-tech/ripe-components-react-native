import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { capitalize } from "ripe-commons-native";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { Button } from "../../atoms";

export class ButtonToggle extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            text: PropTypes.string,
            icon: PropTypes.string,
            iconSecondary: PropTypes.string,
            color: PropTypes.string,
            colorSecondary: PropTypes.string,
            value: PropTypes.bool,
            variant: PropTypes.string,
            align: PropTypes.string,
            direction: PropTypes.string,
            toggle: PropTypes.bool,
            buttonProps: PropTypes.object,
            onPress: PropTypes.func,
            onUpdateActive: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            icon: undefined,
            iconSecondary: undefined,
            color: "#f4f5f7",
            colorSecondary: "#4a6fe9",
            value: false,
            variant: undefined,
            align: undefined,
            direction: undefined,
            toggle: true,
            buttonProps: {},
            onPress: undefined,
            onUpdateActive: value => {},
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            valueData: props.toggle ? props.value : undefined
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                valueData: this.props.value
            });
        }
    }

    onPress = event => {
        if (this.props.onPress) this.props.onPress(event);
        if (!this.props.toggle) return;

        this.setState(
            prevState => ({
                valueData: !prevState.valueData
            }),
            () => this.props.onUpdateActive(this.state.valueData)
        );
    };

    _text = () => {
        // shows text if no icon is provided or if
        // the user explicitly chooses
        return this.props.icon ? null : this.props.text;
    };

    _styleName = name => {
        if (!this.props.variant) return name;
        return `${name}${capitalize(this.props.variant)}`;
    };

    _icon = () => {
        return this.state.valueData ? this.props.icon : this.props.iconSecondary || this.props.icon;
    };

    _color = () => {
        if (this.state.valueData) return this.props.colorSecondary;
        if (this.props.variant) return;
        return this.props.color;
    };

    _contentColor = () => {
        // switches the icon color with the value color
        // when the button is not active
        return this.state.valueData ? "#ffffff" : this.props.colorSecondary || "#000000";
    };

    _style = () => {
        return [this.props.styles.buttonToggle, this.props.style];
    };

    _containerStyle = () => {
        return [
            this.props.styles.buttonToggle,
            this.props.direction === "middle-horizontal"
                ? this.props.styles[this._styleName("buttonToggleMiddleHorizontal")]
                : {},
            this.props.direction === "middle-vertical"
                ? this.props.styles[this._styleName("buttonToggleMiddleVertical")]
                : {},
            this.props.direction === "left"
                ? this.props.styles[this._styleName("buttonToggleLeft")]
                : {},
            this.props.direction === "right"
                ? this.props.styles[this._styleName("buttonToggleRight")]
                : {},
            this.props.direction === "top"
                ? this.props.styles[this._styleName("buttonToggleTop")]
                : {},
            this.props.direction === "bottom"
                ? this.props.styles[this._styleName("buttonToggleBottom")]
                : {}
        ];
    };

    render() {
        return (
            <Button
                style={this._style()}
                containerStyle={this._containerStyle()}
                text={this._text()}
                icon={this._icon()}
                backgroundColor={this._color()}
                iconColor={this._contentColor()}
                iconFillColor={this._contentColor()}
                textColor={this._contentColor()}
                variant={this.props.variant}
                align={this.props.align}
                {...this.props.buttonProps}
                onPress={this.onPress}
                {...this.id("toggle-button")}
            />
        );
    }
}

const styles = StyleSheet.create({
    buttonToggle: {
        overflow: "hidden",
        minWidth: 60,
        borderRadius: 0
    },
    buttonToggleLeft: {
        borderRadius: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    buttonToggleLeftFlat: {
        borderRadius: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    buttonToggleMiddleHorizontal: {
        borderRadius: 0
    },
    buttonToggleMiddleHorizontalFlat: {
        borderRadius: 0,
        borderLeftWidth: 0
    },
    buttonToggleMiddleVertical: {
        borderRadius: 0
    },
    buttonToggleMiddleVerticalFlat: {
        borderRadius: 0,
        borderTopWidth: 0
    },
    buttonToggleRight: {
        borderRadius: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    buttonToggleRightFlat: {
        borderRadius: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftWidth: 0
    },
    buttonToggleTop: {
        borderRadius: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    buttonToggleTopFlat: {
        borderRadius: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    buttonToggleBottom: {
        borderRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    buttonToggleBottomFlat: {
        borderRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopWidth: 0
    }
});

export default ButtonToggle;
