import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";
import { equal, mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Icon } from "../../atoms";

export class Select extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            options: PropTypes.array,
            value: PropTypes.any,
            shapeVariant: PropTypes.string,
            colorVariant: PropTypes.string,
            placeholder: PropTypes.string,
            disabled: PropTypes.bool,
            width: PropTypes.number,
            onUpdateValue: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            options: [],
            value: undefined,
            placeholder: undefined,
            shapeVariant: "round",
            colorVariant: "white",
            disabled: false,
            width: undefined,
            keyTimeout: 500,
            onUpdateValue: () => {},
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
        if (!equal(prevProps.value, this.props.value)) {
            this.setState({
                valueData: this.props.value
            });
        }
    }

    onValueChange = value => {
        if (value === "_empty") {
            // workaround for not allowing the "no items" options to
            // be selected, for android it requires the double update
            // so that it forces the select to update its value to the
            // placeholder
            this.setState({ valueData: "" }, () => this.setState({ valueData: null }));
            return;
        }

        this.setState(
            {
                valueData: value
            },
            () => this.props.onUpdateValue(value)
        );
    };

    _inputBorderColor = () => {
        if (this.props.colorVariant === "white") return "#e7e9ed";
        if (this.props.colorVariant === "gray") return "#e4e8f0";
    };

    _inputBackgroundColor = () => {
        if (this.props.colorVariant === "white") return "#ffffff";
        if (this.props.colorVariant === "gray") return "#f6f7f9";
    };

    _inputBorderRadius = () => {
        if (this.props.shapeVariant === "round") return 6;
    };

    _icon = () => {
        return <Icon icon={"chevron-down"} color={"#1b2632"} strokeWidth={2} />;
    };

    _items = () => {
        if (this.props.options.length === 0) return [{ label: "No items", value: "_empty" }];

        return this.props.options.map(option => ({
            ...option,
            key: option.value,

            // when setting a placeholder, it overrides the selected
            // item styling, so an workaround was made by setting
            // the selected item background color explicitly
            color: option.value === this.state.valueData ? "#7f7f7f" : "#000000"
        }));
    };

    _style = () => {
        return [
            styles.select,
            { width: this.props.width },
            this.props.style,
            this.props.disabled ? styles.disabled : {}
        ];
    };

    _pickerStyle = () => {
        return {
            inputAndroid: {
                color: "#24425a",
                backgroundColor: this._inputBackgroundColor(),
                borderColor: this._inputBorderColor(),
                borderWidth: 1,
                borderRadius: this._inputBorderRadius(),
                fontFamily: baseStyles.FONT_BOOK,
                fontSize: 14,
                paddingLeft: 15,
                height: 40
            },
            inputIOSContainer: {
                color: "#24425a",
                backgroundColor: this._inputBackgroundColor(),
                borderColor: this._inputBorderColor(),
                borderWidth: 1,
                borderRadius: this._inputBorderRadius(),
                fontFamily: baseStyles.FONT_BOOK,
                fontSize: 14,
                paddingLeft: 15,
                height: 40,
                justifyContent: "center"
            },
            placeholder: {
                color: "#24425a"
            },
            iconContainer: {
                top: "25%",
                right: 10
            }
        };
    };

    render() {
        return (
            <View style={this._style()} {...this.id("select")}>
                <RNPickerSelect
                    style={this._pickerStyle()}
                    value={this.state.valueData}
                    items={this._items()}
                    placeholder={{ label: this.props.placeholder, value: null }}
                    disabled={this.props.disabled}
                    useNativeAndroidPickerStyle={false}
                    Icon={this._icon}
                    onValueChange={this.onValueChange}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    select: {
        width: "100%"
    },
    disabled: {
        opacity: 0.75
    }
});

export default Select;
