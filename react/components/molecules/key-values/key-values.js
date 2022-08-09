import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { isTabletSize } from "ripe-commons-native";

import { baseStyles } from "../../../util";

import { KeyValue } from "../key-value";
import { Touchable } from "../../atoms/touchable";

export class KeyValues extends PureComponent {
    static get propTypes() {
        return {
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.string.isRequired,
                    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                    valueComponent: PropTypes.object,
                    keyColor: PropTypes.string,
                    valueColor: PropTypes.string,
                    border: PropTypes.string,
                    icon: PropTypes.string,
                    iconBackgroundColor: PropTypes.string,
                    iconColor: PropTypes.string,
                    iconSize: PropTypes.number,
                    iconHeight: PropTypes.number,
                    iconWidth: PropTypes.number,
                    iconStrokeWidth: PropTypes.number,
                    pressable: PropTypes.bool,
                    clipboard: PropTypes.bool,
                    onPress: PropTypes.func,
                    onButtonIconPress: PropTypes.func,
                    onLongPress: PropTypes.func
                })
            ).isRequired,
            keyValueTwoColumns: PropTypes.bool,
            showUnset: PropTypes.bool,
            nrShowingItems: PropTypes.number,
            expanded: PropTypes.bool,
            style: PropTypes.any,
            buttonExpandDetailsTextStyle: PropTypes.object,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            keyValueTwoColumns: isTabletSize(),
            showUnset: true,
            nrShowingItems: undefined,
            expanded: false,
            style: {},
            buttonExpandDetailsTextStyle: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.expanded ? this.props.expanded : false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.expanded !== this.props.expanded) {
            this.setState({ expanded: this.props.expanded });
        }
    }

    toggleItemsListState = () => {
        const expanded = !this.state.expanded;
        this.setState({ expanded: expanded });
    };

    _shouldShow = item => {
        return Boolean(item.value) || this.props.showUnset;
    };

    _showButton = item => {
        return (
            Boolean(this.props.nrShowingItems) &&
            this.props.nrShowingItems < this.props.items.length
        );
    };

    _getItems = () => {
        if (this.props.nrShowingItems === 0 || this.state.expanded) return this.props.items;
        return this.props.items.slice(0, this.props.nrShowingItems);
    };

    _renderExpandButton = () => {
        return (
            <Touchable
                style={styles.buttonExpandDetails}
                onPress={() => this.toggleItemsListState()}
            >
                <Text style={this._buttonExpandDetailsTextStyle()}>
                    {this._getExpandButtonText()}
                </Text>
            </Touchable>
        );
    };

    _getExpandButtonText = () => {
        return `View ${this.state.expanded ? "less" : "more"}`;
    };

    _buttonExpandDetailsTextStyle = () => {
        return [styles.buttonExpandDetailsText, this.props.buttonExpandDetailsTextStyle];
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
                {this._getItems().map((item, index) => (
                    <View style={this._keyValueWrapperStyle()} key={item.key}>
                        {this._shouldShow(item) && (
                            <KeyValue
                                style={this._keyValueStyle(index)}
                                key={item.key}
                                _key={item.key}
                                value={item.value}
                                keyColor={item.keyColor}
                                valueColor={item.valueColor}
                                border={item.border}
                                icon={item.icon}
                                iconBackgroundColor={item.iconBackgroundColor}
                                iconColor={item.iconColor}
                                iconSize={item.iconSize}
                                iconHeight={item.iconHeight}
                                iconWidth={item.iconWidth}
                                iconStrokeWidth={item.iconStrokeWidth}
                                pressable={item.pressable}
                                clipboard={item.clipboard}
                                onPress={item.onPress}
                                onButtonIconPress={item.onButtonIconPress}
                                onLongPress={item.onLongPress}
                            >
                                {item.valueComponent}
                            </KeyValue>
                        )}
                    </View>
                ))}
                {this._showButton() && this._renderExpandButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyValuesColumns: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    keyValueWrapperColumns: {
        width: "50%"
    },
    keyValueColumnRight: {
        marginLeft: 40
    },
    buttonExpandDetails: {
        alignItems: "center",
        height: 50,
        justifyContent: "center"
    },
    buttonExpandDetailsText: {
        color: "#4f7af8",
        fontSize: 16,
        fontFamily: baseStyles.FONT_REGULAR
    }
});

export default KeyValues;
