import React, { PureComponent } from "react";
import { ScrollView, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { DateInput, InputForm } from "../../molecules";

export class Form extends PureComponent {
    static get propTypes() {
        return {
            fields: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string,
                    fields: PropTypes.array.isRequired
                })
            ).isRequired,
            values: PropTypes.object.isRequired,
            rejectButtonProps: PropTypes.object,
            acceptButtonProps: PropTypes.object,
            saveNotification: PropTypes.bool,
            saveMessage: PropTypes.func,
            saveNotificationProps: PropTypes.object,
            error: PropTypes.bool,
            errorMessage: PropTypes.func,
            errorMessageProps: PropTypes.object,
            onUpdateValues: PropTypes.func,
            onDiscard: PropTypes.func,
            onSave: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            rejectButtonProps: {},
            acceptButtonProps: {},
            saveNotification: true,
            saveMessage: values => "Changes saved!",
            saveNotificationProps: {},
            error: true,
            errorMessage: error => error.message || "Something went wrong",
            errorMessageProps: {},
            onUpdateValues: values => {},
            onDiscard: () => {},
            onSave: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            saving: false,
            valuesData: this.props.values
        };

        this.firstInput = null;
    }

    componentDidMount() {
        this.firstInput?.focus();
    }

    onValueUpdate = (name, value) => {
        this.setState(
            prevState => ({
                valuesData: { ...prevState.valuesData, [name]: value }
            }),
            () => this.props.onUpdateValues(this.state.valuesData)
        );
    };

    _style = () => {
        return [styles.form, this.props.style];
    };

    _renderInputComponent = ({ value, type, label, ...args }) => {
        switch (type) {
            case "text":
                return (
                    <InputForm
                        style={styles.inputForm}
                        ref={el => {
                            if (this.firstInput) return;
                            this.firstInput = el;
                        }}
                        key={value}
                        value={this.state.valuesData[value]}
                        label={label}
                        {...args}
                        onValueUpdate={inputValue => this.onValueUpdate(value, inputValue)}
                    />
                );
            case "date":
                return (
                    <DateInput
                        style={styles.input}
                        key={value}
                        value={this.state.valuesData[value]}
                        header={label}
                        showBorders={false}
                        {...args}
                        onValueUpdate={inputValue => this.onValueUpdate(value, inputValue)}
                    />
                );
            default:
                return;
        }
    };

    _renderSections = () => {
        return this.props.fields.map(({ title, fields }) => {
            return (
                <View style={styles.section}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.sectionTitleText}>{title}</Text>
                    </View>
                    <View>
                        {fields.map((field, index) => (
                            <View style={index < fields.length - 1 ? styles.inputContainer : null}>
                                {this._renderInputComponent(field)}
                            </View>
                        ))}
                    </View>
                </View>
            );
        });
    };

    render() {
        return <ScrollView style={this._style()}>{this._renderSections()}</ScrollView>;
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1
    },
    section: {
        flex: 1
    },
    sectionTitle: {
        backgroundColor: "#f6f7f9",
        padding: 14,
        borderColor: "#e4e8f0",
        borderStyle: "solid",
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    sectionTitleText: {
        fontFamily: baseStyles.FONT
    },
    inputContainer: {
        borderColor: "#e4e8f0",
        borderStyle: "solid",
        borderBottomWidth: 1
    },
    input: {
        flex: 1,
        paddingHorizontal: 15
    },
    inputForm: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 5
    }
});

export default Form;
