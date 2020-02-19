import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { KeyValue } from "../../atoms";

export class KeyValues extends PureComponent {
    static get propTypes() {
        return {
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired
                })
            ).isRequired
        };
    }

    render() {
        return (
            <View>
                {this.props.items.map(item => (
                    <KeyValue key={item.key} _key={item.key} value={item.value} />
                ))}
            </View>
        );
    }
}

export default KeyValues;
