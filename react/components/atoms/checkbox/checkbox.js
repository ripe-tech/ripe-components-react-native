import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { capitalize } from "ripe-commons-native";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Icon } from "../icon";
import { Touchable } from "../touchable";

export class Checkbox extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            label: PropTypes.string,
            checked: PropTypes.bool,
            disabled: PropTypes.bool,
            icon: PropTypes.string,
            size: PropTypes.number,
            variant: PropTypes.string,
            onUpdateChecked: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            icon: "check",
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
        this.setState({ active: true });
    };

    onPressOut = () => {
        this.setState(
            prevState => ({
                active: false,
                checkedData: !prevState.checkedData
            }),
            () => {
                this.props.onUpdateChecked(this.state.checkedData);
            }
        );
    };

    _icon = () => {
        if (this.props.disabled) return `${this.props.icon}-gray`;
        if (this.state.active) return `${this.props.icon}-blue`;
        return this.props.icon;
    };

    _styleBox = () => {
        return [
            styles.checkboxBox,
            {
                width: this.props.size,
                height: this.props.size
            },
            this.state.checkedData ? styles.checkboxBoxChecked : {},
            this.state.active ? styles.checkboxBoxActive : {},
            styles[`checkboxBox${capitalize(this.props.variant)}`],
            this.props.disabled ? styles.checkboxBoxDisabled : {}
        ];
    };

    _labelStyle = () => {
        return [styles.checkboxLabel, this.props.disabled ? styles.checkboxLabelDisabled : {}];
    };

    render() {
        return (
            <Touchable
                style={styles.checkbox}
                activeOpacity={0.8}
                disabled={this.props.disabled}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
            >
                <View style={this._styleBox()} {...this.id("checkbox")}>
                    {(this.state.checkedData || this.state.active) && (
                        <View style={styles.checkboxIconContainer}>
                            <Icon
                                icon={this._icon()}
                                color={null}
                                width={this.props.size / 2}
                                height={this.props.size / 2}
                            />
                        </View>
                    )}
                </View>
                <Text style={this._labelStyle()}>{this.props.label}</Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    checkbox: {
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center"
    },
    checkboxBox: {
        borderColor: "#c3c9cf",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 6
    },
    checkboxBoxChecked: {
        backgroundColor: "#597cf0",
        borderWidth: 0
    },
    checkboxBoxActive: {
        backgroundColor: "#c3c9cf",
        borderWidth: 0
    },
    checkboxBoxDisabled: {
        backgroundColor: "#F6F7F9",
        borderColor: "#F6F7F9",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 6
    },
    checkboxBoxError: {
        borderColor: "#ce544d",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 6
    },
    checkboxIconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    checkboxLabel: {
        fontFamily: baseStyles.FONT,
        marginLeft: 4,
        marginTop: Platform.OS === "ios" ? 3 : 0,
        marginBottom: Platform.OS === "ios" ? 0 : 0,
        opacity: 1
    },
    checkboxLabelDisabled: {
        opacity: 0.5
    }
});

export default Checkbox;
