import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import PropTypes from "prop-types";

import { capitalize, dateString, timeString } from "../../../util";

import { Icon, Text } from "../../atoms";

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
            onPress: () => {},
            style: {}
        };
    }

    _style = () => {
        return [styles.item, styles[`item${capitalize(this.props.variant)}`], this.props.style];
    };

    _contentStyle = () => {
        return [styles.itemContent, styles[`itemContent${capitalize(this.props.variant)}`]];
    };

    render() {
        return (
            <View style={this._style()}>
                <TouchableOpacity
                    style={this._contentStyle()}
                    activeOpacity={0.4}
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
                                        width={24}
                                        height={24}
                                        color="#ffffff"
                                    />
                                    <Text style={[styles.headerMargin, styles.headerText]}>
                                        {this.props.headerText}
                                    </Text>
                                </View>
                                <Text style={styles.headerText}>{this.dateData}</Text>
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
        height: 28,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 12,
        marginLeft: 12
    },
    headerTextContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerMargin: {
        marginLeft: 7
    },
    headerText: {
        color: "#ffffff",
        lineHeight: 30
    }
});

export default Item;
