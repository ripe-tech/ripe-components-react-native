import React, { PureComponent } from "react";
import { ScrollView, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles, notify } from "../../../util";

import { Button } from "../../atoms";
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
            error: PropTypes.bool,
            errorMessage: PropTypes.func,
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
            error: true,
            errorMessage: error => error.message || "Something went wrong",
            onUpdateValues: values => {},
            onDiscard: undefined,
            onSave: undefined,
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            valuesData: this.props.values,
            saving: false
        };

        this.firstInput = null;
    }

    componentDidMount() {
        this.firstInput?.focus();
    }

    save = async () => {
        if (!this.props.onSave) return;
        this.setState({ saving: true });

        try {
            await this.props.onSave(this.values);

            if (this.saveNotification) {
                notify(this.props.saveMessage(this.state.valuesData));
            }
        } catch (error) {
            if (this.error) {
                this.notify(this.props.errorMessage(error));
            }
        } finally {
            this.setState({ saving: false });
        }
    };

    discard = async () => {
        if (!this.props.onDiscard) return;

        try {
            await this.props.onDiscard(this.state.valuesData);
        } catch (error) {
            if (this.props.error) {
                this.notify(this.props.errorMessage(error));
            }
        }
    };

    onValueUpdate = (name, value) => {
        this.setState(
            prevState => ({
                valuesData: { ...prevState.valuesData, [name]: value }
            }),
            () => this.props.onUpdateValues(this.state.valuesData)
        );
    };

    onSubmit = async () => {
        await this.save();
    };

    onReject = async () => {
        await this.discard();
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
                    {title !== undefined && (
                        <View style={styles.sectionTitle}>
                            <Text style={styles.sectionTitleText}>{title}</Text>
                        </View>
                    )}
                    <View style={styles.sectionContent}>
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
        return (
            <ScrollView style={this._style()}>
                {this._renderSections()}
                {(this.props.onSave || this.props.onDiscard) && (
                    <View style={styles.buttons}>
                        {this.props.onSave && (
                            <Button
                                style={styles.submitButton}
                                text={"Save"}
                                loading={this.state.saving}
                                {...this.props.acceptButtonProps}
                                onPress={this.onSubmit}
                            />
                        )}
                        {this.props.onDiscard && (
                            <Button
                                text={"Discard"}
                                backgroundColor={"#a6adb4"}
                                disabled={this.state.saving}
                                {...this.props.rejectButtonProps}
                                onPress={this.onReject}
                            />
                        )}
                    </View>
                )}
            </ScrollView>
        );
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
    sectionContent: {
        backgroundColor: "#ffffff"
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
    },
    buttons: {
        padding: 15
    },
    submitButton: {
        marginBottom: 10
    }
});

export default Form;
