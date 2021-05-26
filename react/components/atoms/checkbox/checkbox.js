import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
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
            checkedData: props.checked
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.checked === this.props.checked) return;
        this.setState({
            checkedData: this.props.checked
        });
    }

    onPress = () => {
        this.setState(
            prevState => ({
                checkedData: !prevState.checkedData
            }),
            () => {
                this.props.onUpdateChecked(this.state.checkedData);
            }
        );
    };

    _iconColor = () => {
        if (this.props.disabled) return this.props.disabled ? "#000000" : "#ffffff";
        return "#ffffff";
    };

    _style = () => {
        const base = [
            styles.checkboxBox,
            {
                width: this.props.size,
                height: this.props.size
            }
        ];
        if (this.state.checkedData) base.push(styles.checkboxBoxChecked);
        if (this.props.variant === "error") base.push(styles.checkboxBoxError);
        if (this.props.disabled) base.push(styles.checkboxBoxDisabled);

        base.push(this.props.style);
        return base;
    };

    _textStyle = () => {
        const base = [styles.checkboxLabel];
        if (this.props.disabled) base.push(styles.checkboxLabelDisabled);
        return base;
    };

    render() {
        return (
            <Touchable
                style={styles.checkbox}
                activeOpacity={0.8}
                disabled={this.props.disabled}
                onPress={this.onPress}
            >
                <View style={this._style()}>
                    {this.state.checkedData && (
                        <View style={styles.checkboxIconContainer}>
                            <Icon
                                icon={this.props.icon}
                                color={this._iconColor()}
                                strokeWidth={0.1}
                                height={this.props.size / 2 + 1}
                                width={this.props.size / 2 + 1}
                            />
                        </View>
                    )}
                </View>
                <Text style={this._textStyle()}>{this.props.label}</Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    checkbox: {
        borderWidth: 0,
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
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#597cf0",
        borderRadius: 6
    },
    checkboxBoxDisabled: {
        backgroundColor: "#c3c9cf",
        borderColor: "#c3c9cf",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 6,
        opacity: 0.5
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
