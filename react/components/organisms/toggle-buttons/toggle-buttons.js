import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { ToggleButton } from "../../molecules";

export class ToggleButtons extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            items: PropTypes.array,
            value: PropTypes.any,
            loading: PropTypes.bool,
            disabled: PropTypes.bool,
            onUpdateValue: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            items: [],
            value: undefined,
            loading: false,
            disabled: false,
            onUpdateValue: value => {},
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
        if (prevProps.value !== this.props.value) {
            this.setState({
                valueData: this.props.value
            });
        }
    }

    onUpdateActive = value => {
        this.setState(
            {
                valueData: value
            },
            () => this.props.onUpdateValue(value)
        );
    };

    _orientation = index => {
        if (index === 0) return "left";
        if (index === this.props.items.length - 1) return "right";
        return "middle";
    };

    _renderButtons = () => {
        return this.props.items.map((item, index) => (
            <ToggleButton
                key={item.value}
                style={styles.toggleButton}
                text={item.label || item.value}
                value={this.state.valueData === item.value}
                buttonProps={{
                    ...item.buttonProps,
                    loading: item.loading || this.props.loading,
                    disabled: item.disabled || this.props.disabled
                }}
                orientation={this._orientation(index)}
                onUpdateActive={() => this.onUpdateActive(item.value)}
                {...item.buttonProps}
            />
        ));
    };

    render() {
        return <View style={styles.toggleButtons}>{this._renderButtons()}</View>;
    }
}

const styles = StyleSheet.create({
    toggleButtons: {
        flexDirection: "row",
        overflow: "hidden"
    },
    toggleButton: {
        marginRight: 5
    }
});

export default ToggleButtons;
