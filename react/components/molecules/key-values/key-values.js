import React, { PureComponent } from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { KeyValue } from "../key-value";

export class KeyValues extends PureComponent {
    static get propTypes() {
        return {
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired
                })
            ).isRequired,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return { style: {} };
    }

    render() {
        return (
            <View style={this.props.style}>
                {this.props.items.map(item => (
                    <KeyValue key={item.key} _key={item.key} value={item.value} />
                ))}
            </View>
        );
    }
}

export default KeyValues;
