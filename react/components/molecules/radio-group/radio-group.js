import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import { mix } from "yonius";
import PropTypes from "prop-types";

import { IdentifiableMixin } from "../../../util";

import { Radio } from "../../atoms";

export class RadioGroup extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            items: PropTypes.arrayOf(
                PropTypes.exact({
                    label: PropTypes.string,
                    value: PropTypes.string.isRequired,
                    disabled: PropTypes.bool,
                    error: PropTypes.bool
                })
            ),
            values: PropTypes.object,
            error: PropTypes.bool,
            disabled: PropTypes.bool,
            beforeItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
            afterItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
            onUpdateValue: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            items: [],
            values: {},
            error: false,
            disabled: false,
            beforeItem: undefined,
            afterItem: undefined,
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

    onUpdateChecked = value => {
        this.setState(
            {
                valueData: value
            },
            () => this.props.onUpdateValue(value)
        );
    };

    _style() {
        return [styles.radioGroup, this.props.style];
    }

    _renderRadios = () => {
        return this.props.items.map((item, index) => (
            <View style={styles.radioItem} key={item.value}>
                {this.props.beforeItem &&
                    React.cloneElement(React.Children.only(this.props.beforeItem), {
                        index: index,
                        item: item,
                        checked: item.value === this.state.valueData
                    })}
                <Radio
                    label={item.label || item.value}
                    value={item.value}
                    checked={item.value === this.state.valueData}
                    disabled={item.disabled === undefined ? this.props.disabled : item.disabled}
                    variant={item.variant || this.props.error ? "error" : null}
                    onUpdateChecked={this.onUpdateChecked}
                />
                {this.props.afterItem &&
                    React.cloneElement(React.Children.only(this.props.afterItem), {
                        index: index,
                        item: item,
                        checked: item.value === this.state.valueData
                    })}
            </View>
        ));
    };

    render() {
        return (
            <View style={this._style()} {...this.id("radio-group")}>
                {this._renderRadios()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    radioGroup: {
        overflow: "hidden"
    },
    radioItem: {
        marginBottom: 10
    }
});

export default RadioGroup;
