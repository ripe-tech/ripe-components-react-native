import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, ViewPropTypes, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { ContainerOpenable, Icon, Touchable } from "../../atoms";

export class DateInput extends PureComponent {
    static get propTypes() {
        return {
            value: PropTypes.instanceOf(Date),
            disabled: PropTypes.bool,
            activeOpacity: PropTypes.number,
            onUpdateValue: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            value: new Date(),
            disabled: false,
            activeOpacity: 0.75,
            onUpdateValue: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        console.log("props", props.value);

        this.state = {
            valueData: this.props.value,
            visible: false
        };
    }

    onPress = () => {
        this.setState({
            visible: true
        });
        if (Platform.OS === "ios") this.container.toggle();
    };

    onChange = (event, value) => {
        console.log("val", value);
        this.setState(
            prevState => ({
                valueData: value || prevState.valueData,
                visible: false
            }),
            () => this.props.onUpdateValue(value)
        );
    };

    _style = () => {
        return [styles.dateInput, this.props.style];
    };

    _renderCalendar = () => {
        if (Platform.OS === "ios") {
            return (
                <ContainerOpenable ref={el => (this.container = el)}>
                    <DateTimePicker
                        value={this.state.valueData}
                        mode={"date"}
                        is24Hour={false}
                        display="inline"
                        onChange={this.onChange}
                    />
                </ContainerOpenable>
            );
        }

        if (!this.state.visible) return;
        return (
            <DateTimePicker
                value={this.state.valueData}
                mode={"date"}
                display={"calendar"}
                is24Hour={false}
                onChange={this.onChange}
            />
        );
    };

    render() {
        return (
            <View style={this._style()}>
                <Touchable
                    style={styles.dateInputButton}
                    activeOpacity={this.props.activeOpacity}
                    disabled={false}
                    onPress={this.onPress}
                >
                    <View style={styles.columnText}>
                        <Text style={styles.headerText}>Birth Date</Text>
                        <Text style={styles.dateText}>
                            {this.state.valueData?.toLocaleDateString()}
                        </Text>
                    </View>
                    <Icon style={styles.icon} icon={"calendar-round"} strokeWidth={0.1} size={16} />
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        overflow: "hidden"
    },
    dateInputButton: {
        width: "100%",
        height: 75,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    columnText: {
        flex: 1,
        marginHorizontal: 15
    },
    icon: {
        flex: 1,
        marginHorizontal: 15
    },
    headerText: {
        fontFamily: baseStyles.FONT,
        color: "#4f7af8",
        fontSize: 12,
        lineHeight: 14,
        marginBottom: 5
    },
    dateText: {
        fontFamily: baseStyles.FONT,
        color: "#223645",
        fontSize: 16,
        lineHeight: 18
    },
    modal: {
        width: "100%"
    }
});

export default DateInput;
