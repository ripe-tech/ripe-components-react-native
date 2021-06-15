import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { equal, mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { Checkbox } from "../../atoms";

export class CheckboxGroup extends mix(PureComponent).with(IdentifiableMixin) {
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
            onUpdateValues: PropTypes.func,
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
            onUpdateValues: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            valueData: props.values
        };
    }

    componentDidUpdate(prevProps) {
        if (!equal(prevProps.values, this.props.values)) {
            this.setState({ valueData: this.props.values });
        }
    }

    onUpdateChecked = (event, item) => {
        this.setState(
            prevState => ({
                valueData: {
                    ...prevState.valueData,
                    [item.value]: !prevState.valueData[item.value]
                }
            }),
            () => this.props.onUpdateValues(this.state.valueData)
        );
    };

    _renderCheckboxes = () => {
        return this.props.items.map((item, index) => (
            <View style={styles.checkboxItem} key={item.value}>
                {this.props.beforeItem &&
                    React.cloneElement(this.props.beforeItem, {
                        index: index,
                        item: item,
                        checked: this.state.valueData[item.value]
                    })}
                <Checkbox
                    label={item.label || item.value}
                    checked={this.state.valueData[item.value]}
                    disabled={item.disabled || this.props.disabled}
                    variant={item.variant || this.props.error ? "error" : null}
                    onUpdateChecked={event => this.onUpdateChecked(event, item)}
                />
                {this.props.afterItem &&
                    React.cloneElement(this.props.afterItem, {
                        index: index,
                        item: item,
                        checked: this.state.valueData[item.value]
                    })}
            </View>
        ));
    };

    render() {
        return (
            <View style={[styles.checkboxGroup, this.props.style]} {...this.id("checkbox-group")}>
                {this._renderCheckboxes()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    checkboxGroup: {
        overflow: "hidden"
    },
    checkboxItem: {
        marginBottom: 10
    }
});

export default CheckboxGroup;
