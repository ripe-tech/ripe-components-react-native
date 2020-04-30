import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { KeyValue } from "../key-value";
import { isTabletSize } from "../../../util/ui-utils";

export class KeyValues extends PureComponent {
    static get propTypes() {
        return {
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    value: PropTypes.string.isRequired,
                    keyColor: PropTypes.string,
                    valueColor: PropTypes.string,
                    icon: PropTypes.string,
                    iconBackgroundColor: PropTypes.string,
                    iconColor: PropTypes.string,
                    iconSize: PropTypes.number,
                    iconHeight: PropTypes.number,
                    iconWidth: PropTypes.number,
                    iconStrokeWidth: PropTypes.number,
                    pressable: PropTypes.bool,
                    onPress: PropTypes.func,
                    onButtonIconPress: PropTypes.func,
                    onLongPress: PropTypes.func
                })
            ).isRequired,
            twoColumns: PropTypes.bool,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            twoColumns: isTabletSize(),
            style: {}
        };
    }

    _style = () => {
        return [this.props.twoColumns ? styles.keyValuesColumns : {}, this.props.style];
    };

    _keyValueStyle = () => {
        return this.props.twoColumns ? styles.keyValueTwoColumns : {};
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
                        keyColor={item.keyColor}
                        valueColor={item.valueColor}
                        icon={item.icon}
                        iconBackgroundColor={item.iconBackgroundColor}
                        iconColor={item.iconColor}
                        iconSize={item.iconSize}
                        iconHeight={item.iconHeight}
                        iconWidth={item.iconWidth}
                        iconStrokeWidth={item.iconStrokeWidth}
                        pressable={item.pressable}
                        onPress={item.onPress}
                        onButtonIconPress={item.onButtonIconPress}
                        onLongPress={item.onLongPress}
                    >
                        {item.valueComponent}
                    </KeyValue>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyValuesColumns: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    keyValueTwoColumns: {
        width: "48%"
    }
});

export default KeyValues;
