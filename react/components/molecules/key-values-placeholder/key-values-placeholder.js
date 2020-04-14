import React, { PureComponent } from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { KeyValuePlaceholder } from "../key-value-placeholder";

export class KeyValuesPlaceholder extends PureComponent {
    static get propTypes() {
        return {
            colors: PropTypes.arrayOf(PropTypes.string).isRequired,
            locations: PropTypes.arrayOf(PropTypes.number).isRequired,
            numberOfItems: PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return { numberOfItems: 1, style: {} };
    }

    render() {
        return (
            <View style={this.props.style}>
                {[...Array(this.props.numberOfItems)].map((_item, index) => (
                    <KeyValuePlaceholder
                        key={index}
                        colors={this.props.colors}
                        locations={this.props.locations}
                    />
                ))}
            </View>
        );
    }
}

export default KeyValuesPlaceholder;
