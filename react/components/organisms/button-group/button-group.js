import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { ButtonToggle } from "../../molecules";

export class ButtonGroup extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            items: PropTypes.array,
            value: PropTypes.any,
            loading: PropTypes.bool,
            disabled: PropTypes.bool,
            variant: PropTypes.string,
            variantActive: PropTypes.string,
            align: PropTypes.string,
            toggle: PropTypes.bool,
            orientation: PropTypes.string,
            buttonComponent: PropTypes.any,
            onUpdateValue: PropTypes.func,
            style: ViewPropTypes.style,
            buttonStyle: ViewPropTypes.style,
            buttonActiveStyle: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            items: [],
            value: undefined,
            loading: false,
            disabled: false,
            variant: undefined,
            variantActive: undefined,
            align: undefined,
            toggle: true,
            orientation: "horizontal",
            buttonComponent: undefined,
            onUpdateValue: value => {},
            style: {},
            buttonStyle: {},
            buttonActiveStyle: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            valueData: props.value
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                valueData: this.props.value
            });
        }
    }

    toggleButton = value => {
        this.setState(
            {
                valueData: value
            },
            () => this.props.onUpdateValue(value)
        );
    };

    onUpdateActive = value => {
        if (!this.props.toggle) return;

        this.toggleButton(value);
    };

    onPress = item => {
        if (item.onPress) item.onPress();

        if (!this.props.toggle) return;
        this.toggleButton(item.value);
    };

    _direction = index => {
        if (index === 0 && this.props.orientation === "vertical") return "top";
        if (index === 0) return "left";
        if (index === this.props.items.length - 1 && this.props.orientation === "vertical") {
            return "bottom";
        }
        if (index === this.props.items.length - 1) {
            return "right";
        }
        if (this.props.orientation === "vertical") {
            return "middle-vertical";
        }
        return "middle-horizontal";
    };

    _variant = item => {
        if (this.state.valueData !== item.value) return this.props.variant;
        return this.props.variantActive || this.props.variant;
    };

    _button = (item, index) => {
        if (!this.props.buttonComponent)
            return (
                <ButtonToggle
                    key={item.value}
                    style={this._buttonStyle(item)}
                    text={item.label || item.value}
                    value={this.state.valueData === item.value}
                    buttonProps={{
                        ...item.buttonProps,
                        loading: item.loading || this.props.loading,
                        disabled: item.disabled || this.props.disabled
                    }}
                    variant={this._variant(item)}
                    direction={this._direction(index)}
                    align={this.props.align}
                    toggle={this.props.toggle}
                    onPress={item.onPress}
                    onUpdateActive={() => this.onUpdateActive(item.value)}
                    {...item.buttonProps}
                />
            );

        return React.cloneElement(React.Children.only(this.props.buttonComponent), {
            key: item.value,
            style: this._buttonStyle(item),
            text: item.label || item.value,
            value: this.state.valueData === item.value,
            buttonProps: {
                ...item.buttonProps,
                loading: item.loading || this.props.loading,
                disabled: item.disabled || this.props.disabled
            },
            variant: this._variant(item),
            direction: this._direction(index),
            align: this.props.align,
            toggle: this.props.toggle,
            onPress: () => this.onPress(item),
            ...item.buttonProps
        });
    };

    _style = () => {
        return [
            this.props.styles.buttonGroup,
            this.props.orientation === "horizontal" ? { flexDirection: "row" } : {},
            this.props.orientation === "vertical" ? { flexDirection: "column" } : {}
        ];
    };

    _buttonStyle = item => {
        return [
            this.props.styles.buttonToggle,
            this.props.orientation === "vertical" ? { width: "100%" } : {},
            this.props.buttonStyle,
            this.state.valueData === item.value ? this.props.buttonActiveStyle : {}
        ];
    };

    render() {
        return (
            <View style={this._style()}>
                {this.props.items.map((item, index) => this._button(item, index))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonGroup: {
        overflow: "hidden",
        flexWrap: "wrap"
    },
    buttonToggle: {
        flexShrink: 0,
        flexGrow: 0
    }
});

export default ButtonGroup;
