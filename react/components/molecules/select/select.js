import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";

import { baseStyles, equal } from "../../../util";

import { Icon } from "../../atoms";

export class Select extends PureComponent {
    static get propTypes() {
        return {
            options: PropTypes.array,
            value: PropTypes.any,
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
        this.setState(
            {
                valueData: value
            },
            () => this.props.onUpdateValue(value)
        );
    };

    _icon = () => {
        return <Icon icon={"chevron-down"} color={"#1b2632"} strokeWidth={2} />;
    };

    _items = () => {
        return this.props.options.map(option => ({
            ...option,
            key: option.value,

            // workaround for placeholder use overriding
            // the selected item style
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
                backgroundColor: "#f6f7f9",
                borderColor: "#e4e8f0",
                borderWidth: 1,
                fontFamily: baseStyles.FONT_BOOK,
                fontSize: 14,
                paddingLeft: 10,
                height: 40
            },
            inputIOSContainer: {
                color: "#24425a",
                backgroundColor: "#f6f7f9",
                borderColor: "#e4e8f0",
                borderWidth: 1,
                fontFamily: baseStyles.FONT_BOOK,
                fontSize: 14,
                paddingLeft: 10,
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
