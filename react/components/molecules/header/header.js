import React, { PureComponent } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import SafeAreaView from "react-native-safe-area-view";

import { baseStyles } from "../../../util";

import { Icon } from "../../atoms";

export class Header extends PureComponent {
    static get propTypes() {
        return {
            title: PropTypes.string,
            navigation: PropTypes.object,
            buttonLeftIcon: PropTypes.string,
            buttonLeftVisible: PropTypes.bool,
            buttonRightIcon: PropTypes.string,
            buttonRightVisible: PropTypes.bool,
            hitSlop: PropTypes.shape({
                top: PropTypes.number.isRequired,
                left: PropTypes.number.isRequired,
                right: PropTypes.number.isRequired,
                bottom: PropTypes.number.isRequired
            }),
            onButtonLeftPress: PropTypes.func,
            onButtonRightPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            title: undefined,
            navigation: undefined,
            buttonLeftIcon: "arrow-left",
            buttonLeftVisible: true,
            buttonRightIcon: undefined,
            buttonRightVisible: false,
            hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
            onButtonLeftPress: undefined,
            onButtonRightPress: undefined
        };
    }

    goBack = () => this.props.navigation && this.props.navigation.pop(1);

    render() {
        return (
            <SafeAreaView style={styles.header}>
                {this.props.buttonLeftVisible && this.props.buttonLeftIcon ? (
                    <TouchableOpacity
                        hitSlop={this.props.hitSlop}
                        onPress={
                            this.props.onButtonLeftPress
                                ? this.props.onButtonLeftPress
                                : this.goBack
                        }
                        style={styles.containerButtonLeft}
                    >
                        <Icon
                            icon={this.props.buttonLeftIcon}
                            width={30}
                            height={24}
                            strokeWidth={2}
                            color={"#1d2631"}
                        />
                    </TouchableOpacity>
                ) : null}
                {this.props.title ? <Text style={styles.title}>{this.props.title}</Text> : null}
                {this.props.buttonRightVisible && this.props.buttonRightIcon ? (
                    <TouchableOpacity
                        hitSlop={this.props.hitSlop}
                        onPress={
                            this.props.onButtonRightPress ? this.props.onButtonRightPress : () => {}
                        }
                        style={styles.containerButtonRight}
                    >
                        <Icon
                            color={"#1d2631"}
                            icon={this.props.buttonRightIcon}
                            width={24}
                            height={30}
                            strokeWidth={2}
                        />
                    </TouchableOpacity>
                ) : null}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#f5f7f9",
        borderBottomColor: "#e4e8f0",
        borderBottomWidth: 1,
        paddingVertical: 14,
        flexDirection: "row"
    },
    title: {
        marginTop: Platform.OS === "ios" ? 6 : 0,
        fontFamily: baseStyles.FONT,
        fontSize: 20,
        letterSpacing: 0.5,
        color: "#1d2631",
        flex: 1,
        textAlign: "center"
    },
    containerButtonLeft: {
        zIndex: 1,
        position: "absolute",
        top: 18,
        left: 10
    },
    containerButtonRight: {
        zIndex: 1,
        position: "absolute",
        top: 18,
        right: 10
    }
});
