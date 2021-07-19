import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, ViewPropTypes, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateStringUTC } from "ripe-commons";
import { mix } from "yonius";
import PropTypes from "prop-types";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { ContainerOpenable, Icon, Touchable } from "../../atoms";

export class DateInput extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            value: PropTypes.number,
            header: PropTypes.string,
            disabled: PropTypes.bool,
            activeOpacity: PropTypes.number,
            showBorders: PropTypes.bool,
            onUpdateValue: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            value: Date.now(),
            header: undefined,
            disabled: false,
            activeOpacity: 0.75,
            showBorders: true,
            onUpdateValue: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            valueData: this.props.value,
            visible: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({ valueData: this.props.value });
        }
    }

    onPress = () => {
        this.setState({
            visible: true
        });
        if (Platform.OS === "ios" && this.container) this.container.toggle();
    };

    onChange = (event, value) => {
        this.setState(
            prevState => ({
                valueData: value || prevState.valueData,
                visible: false
            }),
            () => this.props.onUpdateValue(value)
        );
    };

    _style = () => {
        return [
            styles.dateInput,
            {
                borderTopWidth: this.props.showBorders ? 1 : 0,
                borderBottomWidth: this.props.showBorders ? 1 : 0
            },
            this.props.style
        ];
    };

    _buttonStyle = () => {
        return [styles.dateInputButton, this.props.disabled ? styles.dateInputButtonDisabled : {}];
    };

    _columnTextStyle = () => {
        return [
            styles.columnText,
            {
                marginLeft: this.props.showBorders ? 15 : 5
            }
        ];
    };

    _iconStyle = () => {
        return [
            styles.icon,
            {
                marginRight: this.props.showBorders ? 15 : 5
            }
        ];
    };

    _renderCalendar = () => {
        // iOS date-time picker does not appear in a modal
        // (like Android) but as a element in the page,
        // so it has to be always rendered inside a container
        // (even when not active) that opens when the user
        // presses the button
        if (Platform.OS === "ios") {
            return (
                <ContainerOpenable ref={el => (this.container = el)}>
                    <DateTimePicker
                        value={this.state.valueData ? new Date(this.state.valueData) : Date.now()}
                        mode={"date"}
                        is24Hour={false}
                        display="inline"
                        onChange={this.onChange}
                    />
                </ContainerOpenable>
            );
        }

        // only renders the Android picker modal
        // when the user presses the button and
        // changes the state to visible, which is
        // different than iOS since the container
        // openable is toggled, but the picker
        // is already rendered
        if (!this.state.visible) return;
        return (
            <DateTimePicker
                value={new Date(this.state.valueData)}
                mode={"date"}
                display={"calendar"}
                is24Hour={false}
                onChange={this.onChange}
            />
        );
    };

    render() {
        return (
            <View style={this._style()} {...this.id("date-input")}>
                <Touchable
                    style={this._buttonStyle()}
                    activeOpacity={this.props.activeOpacity}
                    disabled={this.props.disabled}
                    onPress={this.onPress}
                >
                    <View style={this._columnTextStyle()}>
                        {Boolean(this.props.header) && (
                            <Text style={styles.headerText}>{this.props.header}</Text>
                        )}
                        <Text style={styles.dateText}>
                            {this.state.valueData
                                ? dateStringUTC(this.state.valueData / 1000)
                                : "-"}
                        </Text>
                    </View>
                    <Icon
                        style={this._iconStyle()}
                        icon={"calendar-round"}
                        strokeWidth={1.5}
                        size={16}
                    />
                </Touchable>
                {this._renderCalendar()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dateInput: {
        width: "100%",
        borderStyle: "solid",
        borderColor: "#e4e8f0",
        overflow: "hidden"
    },
    dateInputButton: {
        height: 70,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    dateInputButtonDisabled: {
        opacity: 0.5
    },
    columnText: {
        flex: 1,
        justifyContent: "center"
    },
    icon: {
        flex: 1,
        alignSelf: "center"
    },
    headerText: {
        fontFamily: baseStyles.FONT,
        color: "#4f7af8",
        fontSize: 14,
        lineHeight: 16,
        marginBottom: 8
    },
    dateText: {
        fontFamily: baseStyles.FONT,
        color: "#223645",
        fontSize: 16,
        lineHeight: 18
    }
});

export default DateInput;
