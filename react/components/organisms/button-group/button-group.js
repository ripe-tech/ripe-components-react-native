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
            align: PropTypes.string,
            toggle: PropTypes.bool,
            orientation: PropTypes.string,
            onUpdateValue: PropTypes.func,
            style: ViewPropTypes.style,
            buttonStyle: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            items: [],
            value: undefined,
            loading: false,
            disabled: false,
            variant: undefined,
            align: undefined,
            toggle: true,
            orientation: "horizontal",
            onUpdateValue: value => {},
            style: {},
            buttonStyle: {}
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

    onUpdateActive = value => {
        if (!this.props.toggle) return;

        this.setState(
            {
                valueData: value
            },
            () => this.props.onUpdateValue(value)
        );
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

    _style = () => {
        return [
            styles.buttonGroup,
            this.props.orientation === "horizontal" ? { flexDirection: "row" } : {},
            this.props.orientation === "vertical" ? { flexDirection: "column" } : {}
        ];
    };

    buttonStyle = () => {
        return [styles.buttonToggle, this.props.buttonStyle];
    };

    _renderButtons = () => {
        return this.props.items.map((item, index) => (
            <ButtonToggle
                key={item.value}
                style={this.buttonStyle()}
                text={item.label || item.value}
                value={this.state.valueData === item.value}
                buttonProps={{
                    ...item.buttonProps,
                    loading: item.loading || this.props.loading,
                    disabled: item.disabled || this.props.disabled
                }}
                variant={this.props.variant}
                direction={this._direction(index)}
                align={this.props.align}
                toggle={this.props.toggle}
                onPress={item.onPress}
                onUpdateActive={() => this.onUpdateActive(item.value)}
                {...item.buttonProps}
            />
        ));
    };

    render() {
        return <View style={this._style()}>{this._renderButtons()}</View>;
    }
}

const styles = StyleSheet.create({
    buttonGroup: {
        overflow: "hidden"
    },
    buttonToggle: {
        marginRight: 5
    }
});

export default ButtonGroup;
