import React, { PureComponent } from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { Touchable } from "../touchable";

export class Radio extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            label: PropTypes.string,
            value: PropTypes.string,
            checked: PropTypes.bool,
            disabled: PropTypes.bool,
            variant: PropTypes.string,
            size: PropTypes.number,
            onUpdateChecked: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            label: undefined,
            value: undefined,
            checked: false,
            disabled: false,
            size: 20,
            variant: undefined,
            onUpdateChecked: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            checkedData: props.checked,
            active: false
        };
    }

    componentDidUpate(prevProps) {
        if (prevProps.checked === this.props.checked) return;

        this.setState({
            checkedData: this.props.checked
        });
    }

    onPressIn = () => {
        this.setState({
            active: true
        });
    };

    onPressOut = () => {
        this.setState(
            prevState => ({
                checkedData: !prevState.checkedData,
                active: false
            }),
            () => this.props.onUpdateChecked(this.state.checkedData)
        );
    };

    _style = () => {
        return [
            styles.radio,
            {
                width: this.props.size,
                height: this.props.size
            }
        ];
    }

    _styleExterior = () => {
        const base = [
            styles.radioExterior,
            {
                width: this.props.size,
                height: this.props.size
            }
        ];

        if (this.state.checkedData) base.push(styles.radioExteriorChecked)
        if (this.state.active) base.push(styles.radioExteriorActive)
        if (this.props.disabled) base.push(styles.radioExteriorDisabled)

        return base;
    };

    _styleInterior = () => {
        const base = [
            styles.radioInterior,
            {
                width: this.props.size / 3,
                height: this.props.size / 3
            }
        ];

        if (this.state.active) base.push(styles.radioInteriorActive)
        if (this.props.disabled) base.push(styles.radioInteriorDisabled)

        return base;
    };

    render() {
        return (
            <Touchable
                style={this._style()}
                activeOpacity={0.8}
                disabled={this.props.disabled}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
            >
                <View style={this._styleExterior()}>
                    {(this.state.checkedData || this.state.active) && (
                        <View style={this._styleInterior()} />
                    )}
                </View>
                <Text>{this.props.label}</Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    radio: {
        borderRadius: 50,
        overflow: "hidden"
    },
    radioExterior: {
        borderRadius: 50,
        backgroundColor: "#fafbfc",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#dfe1e5"
    },
    radioExteriorChecked: {
        borderWidth: 0,
        backgroundColor: "#597cf0"
    },
    radioExteriorActive: {
        borderWidth: 0,
        backgroundColor: "#c3c9cf"
    },
    radioExteriorDisabled: {
        borderWidth: 0,
        backgroundColor: "#f6f7f9"
    },
    radioInterior: {
        zIndex: 1,
        borderRadius: 50,
        backgroundColor: "#ffffff"
    },
    radioInteriorActive: {
        backgroundColor: "#597cf0"
    },
    radioInteriorDisabled: {
        backgroundColor: "#a6adb4"
    }
});

export default Radio;
