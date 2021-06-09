import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { Button } from "../../atoms";

export class ToggleButton extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            text: PropTypes.string,
            icon: PropTypes.string,
            iconSecondary: PropTypes.string,
            color: PropTypes.string,
            colorSecondary: PropTypes.string,
            active: PropTypes.bool,
            orientation: PropTypes.string,
            loading: PropTypes.bool,
            disabled: PropTypes.bool,
            showText: PropTypes.bool,
            buttonIconProps: PropTypes.object,
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
            active: false,
            orientation: undefined,
            loading: false,
            disabled: false,
            showText: false,
            buttonIconProps: {},
            onUpdateActive: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            activeData: props.active
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.active !== this.props.active) {
            this.setState({
                activeData: this.props.active
            });
        }
    }

    onPress = () => {
        this.setState(
            prevState => ({
                activeData: !prevState.activeData
            }),
            () => this.props.onUpdateActive(this.state.activeData)
        );
    };

    _text = () => {
        // shows text if no icon is provided or if
        // the user explicitly chooses
        return !this.props.icon || this.props.showText ? this.props.text : null;
    };

    _icon = () => {
        return this.state.activeData
            ? this.props.icon
            : this.props.iconSecondary || this.props.icon;
    };

    _color = () => {
        return (
            (this.state.activeData ? this.props.colorSecondary : this.props.color) ||
            this.props.color
        );
    };

    _contentColor = () => {
        // switches the icon color with the active color
        // when the button is not active
        return this.state.activeData ? "#ffffff" : this.props.colorSecondary || "#000000";
    };

    _style = () => {
        return [
            styles.toggleButton,
            this.props.orientation === "middle" ? styles.toggleButtonMiddle : {},
            this.props.orientation === "left" ? styles.toggleButtonLeft : {},
            this.props.orientation === "right" ? styles.toggleButtonRight : {}
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
                loading={this.props.loading}
                disabled={this.props.disabled}
                {...this.props.buttonIconProps}
                onPress={this.onPress}
                {...this.id("toggle-button")}
            />
        );
    }
}

const styles = StyleSheet.create({
    toggleButton: {
        overflow: "hidden",
        minWidth: 60,
        borderRadius: 5
    },
    toggleButtonLeft: {
        borderRadius: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    toggleButtonMiddle: {
        borderRadius: 0
    },
    toggleButtonRight: {
        borderRadius: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    }
});

export default ToggleButton;
