import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles, capitalize } from "../../../util";

import { Touchable } from "../touchable";

export class Radio extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            label: PropTypes.string,
            value: PropTypes.any,
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

    componentDidUpdate(prevProps) {
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
            () => this.props.onUpdateChecked(this.props.value)
        );
    };

    _style = () => {
        return [
            styles.radio,
            {
                height: this.props.size
            }
        ];
    };

    _styleExterior = () => {
        return [
            styles.radioExterior,
            {
                width: this.props.size,
                height: this.props.size
            },
            this.state.checkedData ? styles.radioExteriorChecked : {},
            this.state.active ? styles.radioExteriorActive : {},
            styles[`radioExterior${capitalize(this.props.variant)}`],
            this.props.disabled ? styles.radioExteriorDisabled : {}
        ];
    };

    _styleInterior = () => {
        return [
            styles.radioInterior,
            {
                width: this.props.size / 3,
                height: this.props.size / 3
            },
            this.state.active ? styles.radioInteriorActive : {},
            this.props.disabled ? styles.radioInteriorDisabled : {}
        ];
    };

    _styleLabel = () => {
        return [styles.radioLabel, this.props.disabled ? styles.radioLabelDisabled : {}];
    };

    render() {
        return (
            <Touchable
                style={this._style()}
                activeOpacity={0.8}
                disabled={this.props.disabled}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
                {...this.id("radio")}
            >
                <View style={this._styleExterior()}>
                    {(this.state.checkedData || this.state.active) && (
                        <View style={this._styleInterior()} />
                    )}
                </View>
                <Text style={this._styleLabel()}>{this.props.label}</Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    radio: {
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center"
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
    radioExteriorError: {
        borderWidth: 2,
        borderColor: "#ce544d"
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
    },
    radioLabel: {
        fontFamily: baseStyles.FONT,
        marginLeft: 4,
        marginTop: Platform.OS === "ios" ? 3 : 0,
        marginBottom: Platform.OS === "ios" ? 0 : 2,
        opacity: 1
    },
    radioLabelDisabled: {
        opacity: 0.5
    }
});

export default Radio;
