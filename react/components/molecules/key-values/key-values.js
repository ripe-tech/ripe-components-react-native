import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
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
            columnsNr: PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            columnsNr: 1,
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.keyValuesFiller =
            this.props.columnsNr > 1 ? this.props.items.length % this.props.columnsNr : 0;
    }

    width = () => `${(100 / this.props.columnsNr) * 0.96}%`;

    _style = () => {
        return [this.props.columnsNr > 1 ? styles.keyValuesColumns : {}, this.props.style];
    };

    _keyValueStyle = (isFiller = false) => {
        return this.props.columnsNr > 1
            ? {
                  width: this.width(),
                  opacity: isFiller ? 0 : 1
              }
            : {};
    };

    _keyValuesFiller = () => {
        const filler = [];

        for (let i = 0; i < this.keyValuesFiller; i++)
            filler.push(
                <KeyValue
                    style={this._keyValueStyle(true)}
                    key={`fill-${i}`}
                    _key={`fill-${i}`}
                    value={""}
                />
            );

        return filler;
    };

    render() {
        return (
            <View style={this._style()}>
                {this.props.items.map(item => (
                    <KeyValue
                        style={this._keyValueStyle()}
                        key={item.key}
                        _key={item.key}
                        value={item.value}
                    >
                        {item.valueComponent}
                    </KeyValue>
                ))}
                {this._keyValuesFiller()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyValuesColumns: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }
});

export default KeyValues;
