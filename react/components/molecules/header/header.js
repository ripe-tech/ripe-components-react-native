import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import SafeAreaView from "react-native-safe-area-view";

import { baseStyles, genTestProps } from "../../../util";

import { Icon, Touchable } from "../../atoms";

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
            onButtonRightPress: PropTypes.func,
            buttonLeftTestId: PropTypes.string,
            buttonRightTestId: PropTypes.string
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
            onButtonRightPress: undefined,
            buttonLeftTestId: undefined,
            buttonRightTestId: undefined
        };
    }

    goBack = () =>
        this.props.navigation && this.props.navigation.canGoBack() && this.props.navigation.pop(1);

    render() {
        return (
            <SafeAreaView style={styles.header}>
                {this.props.buttonLeftVisible && this.props.buttonLeftIcon ? (
                    <Touchable
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
                            testId={this.props.buttonLeftTestId || "button-header-left"}
                        />
                    </Touchable>
                ) : null}
                {this.props.title ? (
                    <Text style={styles.title} {...genTestProps("text-header")}>
                        {this.props.title}
                    </Text>
                ) : null}
                {this.props.buttonRightVisible && this.props.buttonRightIcon ? (
                    <Touchable
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
                            testId={this.props.buttonRightTestId || "button-header-right"}
                        />
                    </Touchable>
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

export default Header;
