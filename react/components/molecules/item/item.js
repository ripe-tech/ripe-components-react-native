import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, TouchableOpacity, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import PropTypes from "prop-types";

import { capitalize, dateTimeString, baseStyles } from "../../../util";

import { Icon } from "../../atoms";

export class Item extends PureComponent {
    static get propTypes() {
        return {
            header: PropTypes.bool,
            headerIcon: PropTypes.string,
            headerText: PropTypes.string,
            headerDate: PropTypes.number,
            gradientAngle: PropTypes.number,
            gradientColors: PropTypes.arrayOf(PropTypes.string),
            gradientLocations: PropTypes.arrayOf(PropTypes.number),
            disabled: PropTypes.bool,
            variant: PropTypes.string,
            activeOpacity: PropTypes.number,
            onPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            header: false,
            headerIcon: undefined,
            headerText: undefined,
            headerDate: undefined,
            gradientAngle: 62,
            gradientLocations: [0.4, 0.84],
            gradientColors: ["#4a6fe9", "#6687f6"],
            disabled: true,
            variant: undefined,
            activeOpacity: 0.75,
            onPress: () => {},
            style: {}
        };
    }

    _contentStyle = () => {
        return [styles.itemContent, styles[`itemContent${capitalize(this.props.variant)}`]];
    };

    _style = () => {
        return [styles.item, styles[`item${capitalize(this.props.variant)}`], this.props.style];
    };

    render() {
        return (
            <View style={this._style()}>
                <TouchableOpacity
                    style={this._contentStyle()}
                    activeOpacity={this.props.activeOpacity}
                    disabled={this.props.disabled}
                    onPress={this.props.onPress}
                >
                    {this.props.header && (
                        <LinearGradient
                            style={styles.gradient}
                            angle={this.props.gradientAngle}
                            colors={this.props.gradientColors}
                            locations={this.props.gradientLocations}
                            useAngle={true}
                        >
                            <View style={styles.header}>
                                <View style={styles.headerTextContainer}>
                                    <Icon
                                        icon={this.props.headerIcon}
                                        width={17}
                                        height={17}
                                        color="#ffffff"
                                    />
                                    <Text style={styles.headerText}>{this.props.headerText}</Text>
                                </View>
                                <Text style={styles.headerDate}>
                                    {dateTimeString(this.props.headerDate)}
                                </Text>
                            </View>
                        </LinearGradient>
                    )}
                    {this.props.children}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: "100%",
        paddingHorizontal: "4%"
    },
    itemFull: {
        paddingHorizontal: 0
    },
    itemContent: {
        backgroundColor: "#ffffff",
        borderRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "#435664",
        shadowOpacity: 0.2
    },
    itemContentFull: {
        borderRadius: 0,
        elevation: 0
    },
    gradient: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    header: {
        flexDirection: "row",
        height: 28,
        paddingHorizontal: 12,
        alignItems: "center"
    },
    headerTextContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerText: {
        color: "#ffffff",
        marginLeft: 6,
        fontFamily: baseStyles.FONT
    },
    headerDate: {
        color: "#ffffff",
        flex: 1,
        textAlign: "right",
        fontFamily: baseStyles.FONT
    }
});

export default Item;
