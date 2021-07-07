import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { isTabletSize } from "../../../util";

import { KeyValue } from "../key-value";

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
            keyValueTwoColumns: PropTypes.bool,
            showUnset: PropTypes.bool,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            keyValueTwoColumns: isTabletSize(),
            showUnset: true,
            style: {}
        };
    }

    _shouldShow = item => {
        return Boolean(item.value) || this.props.showUnset;
    };

    _style = () => {
        return [this.props.keyValueTwoColumns ? styles.keyValuesColumns : {}, this.props.style];
    };

    _keyValueWrapperStyle = () => {
        return this.props.keyValueTwoColumns ? styles.keyValueWrapperColumns : {};
    };

    _keyValueStyle = index => {
        return this.props.keyValueTwoColumns && index % 2 > 0 ? styles.keyValueColumnRight : {};
    };

    render() {
        return (
            <View style={this._style()}>
                {this.props.items.map((item, index) => (
                    <View style={this._keyValueWrapperStyle()} key={item.key}>
                        {this._shouldShow(item) && (
                            <KeyValue
                                style={this._keyValueStyle(index)}
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
                        )}
                    </View>
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
    keyValueWrapperColumns: {
        width: "50%"
    },
    keyValueColumnRight: {
        marginLeft: 40
    }
});

export default KeyValues;
