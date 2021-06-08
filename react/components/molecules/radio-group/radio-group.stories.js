import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";
import PropTypes from "prop-types";

import { RadioGroup } from "./radio-group";

class Wrapper extends PureComponent {
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
            value: PropTypes.any,
            error: PropTypes.bool,
            disabled: PropTypes.bool
        };
    }

    static get defaultProps() {
        return {
            items: [],
            value: undefined,
            error: false,
            disabled: false
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            valueData: null
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value === this.props.value) return;
        this.setState({
            valueData: this.props.value
        });
    }

    onUpdateValue = value => {
        this.setState({
            valueData: value
        });
    };

    render() {
        return (
            <View>
                <RadioGroup
                    items={this.props.items}
                    value={this.props.value}
                    error={this.props.error}
                    disabled={this.props.disabled}
                    onUpdateValue={this.onUpdateValue}
                />
                <Text>Value selected: {this.state.valueData}</Text>
            </View>
        );
    }
}

storiesOf("Components/Molecules/Radio Group", module)
    .addDecorator(withKnobs)
    .add("Radio Group", () => {
        const items = [
            {
                label: "Margherita",
                value: "margherita",
                disabled: true
            },
            {
                value: "bbq_chicken",
                label: "BBQ chicken"
            },
            {
                label: "Pepperoni",
                value: "pepperoni",
                disabled: true
            },
            {
                value: "hawaiian",
                label: "Hawaiian w/ pineapple"
            }
        ];
        const value = select(
            "Value",
            {
                Nothing: null,
                Margherita: "margherita",
                "BBQ chicken": "bbq_chicken",
                Pepperoni: "pepperoni",
                "Hawaiian w/ pineapple": "hawaiian"
            },
            null
        );
        const error = boolean("Error", false);
        const disabled = boolean("Disabled", false);

        return <Wrapper items={items} value={value} error={error} disabled={disabled} />;
    });
