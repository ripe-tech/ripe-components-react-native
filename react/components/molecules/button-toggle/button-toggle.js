import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
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
            orientation: PropTypes.string,
            buttonProps: PropTypes.object,
            onUpdateActive: PropTypes.func,
            style: ViewPropTypes.style
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
            orientation: undefined,
            buttonProps: {},
            onUpdateActive: value => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            valueData: props.value
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
        return [
            styles.buttonToggle,
            this.props.orientation === "middle" ? styles.buttonToggleMiddle : {},
            this.props.orientation === "left" ? styles.buttonToggleLeft : {},
            this.props.orientation === "right" ? styles.buttonToggleRight : {}
        ];
    };

    render() {
        return (
            <Button
                style={this._style()}
                text={this._text()}
                icon={this._icon()}
                backgroundColor={this._color()}
                iconColor={this._contentColor()}
                iconFillColor={this._contentColor()}
                textColor={this._contentColor()}
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
        borderRadius: 5
    },
    buttonToggleLeft: {
        borderRadius: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    buttonToggleMiddle: {
        borderRadius: 0
    },
    buttonToggleRight: {
        borderRadius: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    }
});

export default ButtonToggle;
