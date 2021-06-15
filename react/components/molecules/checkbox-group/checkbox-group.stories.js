import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import { CheckboxGroup } from "./checkbox-group";

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
            error: PropTypes.bool,
            disabled: PropTypes.bool
        };
    }

    static get defaultProps() {
        return {
            items: [],
            error: false,
            disabled: false
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            values: {}
        };
    }

    onUpdateValues = values => {
        this.setState({
            values: values
        });
    };

    render() {
        return (
            <View>
                <CheckboxGroup
                    items={this.props.items}
                    error={this.props.error}
                    disabled={this.props.disabled}
                    onUpdateValues={this.onUpdateValues}
                />
                <Text style={{ marginBottom: 10 }}>Items: {JSON.stringify(this.props.items)}</Text>
                <Text>Values: {JSON.stringify(this.state.values)}</Text>
            </View>
        );
    }
}

storiesOf("Components/Molecules/Checkbox Group", module)
    .addDecorator(withKnobs)
    .add("Checkbox Group", () => {
        const items = [
            {
                label: "Japan",
                value: "japan"
            },
            {
                label: "Morocco",
                value: "morocco"
            },
            {
                value: "canada"
            },
            {
                label: "China",
                value: "china"
            },
            {
                label: "Dubai",
                value: "dubai"
            },
            {
                label: "Bali",
                value: "bali",
                disabled: true
            },
            {
                label: "Tibet",
                value: "tibet",
                error: true
            }
        ];
        const error = boolean("Error", false);
        const disabled = boolean("Disabled", false);

        return <Wrapper items={items} error={error} disabled={disabled} />;
    });
