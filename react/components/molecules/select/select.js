import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";
import RNPickerSelect from "react-native-picker-select";

import { baseStyles } from "../../../util";

import { Icon } from "../../atoms";

export class Select extends PureComponent {
    static get propTypes() {
        return {
            options: PropTypes.array,
            value: PropTypes.string,
            visible: PropTypes.bool,
            placeholder: PropTypes.string,
            autoScroll: PropTypes.bool, // check this
            disabled: PropTypes.bool,
            align: PropTypes.string,
            direction: PropTypes.string,
            width: PropTypes.number,
            maxHeight: PropTypes.number,
            dropdownMinWidth: PropTypes.number,
            dropdownMaxWidth: PropTypes.number,
            keyTimeout: PropTypes.number,
            activeOpacity: PropTypes.number,
            onUpdateVisible: PropTypes.func,
            onUpdateValue: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            options: [],
            value: undefined,
            visible: false,
            placeholder: "",
            autoScroll: true,
            disabled: false,
            align: "right",
            direction: "bottom",
            width: undefined,
            maxHeight: 206,
            dropdownMinWidth: undefined,
            dropdownMaxWidth: undefined,
            keyTimeout: 500,
            activeOpacity: 0.75,
            onUpdateVisible: () => {},
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

    onButtonPress = () => {
        this.props.onUpdateVisible();
    };

    onValueChange = value => {
        this.setState({
            valueData: value
        });
    };

    _style = () => {
        return [styles.select, this.props.style];
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
                paddingLeft: 10
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
            <View style={this._style()}>
                <RNPickerSelect
                    style={this._pickerStyle()}
                    selectedValue={this.state.valueData}
                    items={this.props.options.map(option => ({ ...option, key: option.value }))}
                    placeholder={{ label: this.props.placeholder, value: null }}
                    disabled={this.props.disabled}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => <Icon icon={"chevron-down"} color={"#1b2632"} strokeWidth={2} />}
                    onValueChange={this.onValueChange}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    select: {
        width: "100%"
    }
});

export default Select;
