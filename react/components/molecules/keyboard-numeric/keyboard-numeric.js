import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";
import { isTabletSize } from "ripe-commons-native";

import { IdentifiableMixin } from "../../../util";

import { ButtonKeyboard } from "../../atoms";

export class KeyboardNumeric extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            onKeyPress: PropTypes.func,
            onKeyLongPress: PropTypes.func,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            onKeyPress: value => {},
            onKeyLongPress: value => {},
            styles: styles
        };
    }

    render() {
        return (
            <View style={styles.keyboardNumeric}>
                <View style={styles.row}>
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"1"}
                        value={1}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"2"}
                        value={2}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"3"}
                        value={3}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                </View>
                <View style={styles.row}>
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"4"}
                        value={4}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"5"}
                        value={5}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"6"}
                        value={6}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                </View>
                <View style={styles.row}>
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"7"}
                        value={7}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"8"}
                        value={8}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"9"}
                        value={9}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                </View>
                <View style={styles.row}>
                    <View style={[styles.filler, styles.buttonKeyboard]} />
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        text={"0"}
                        value={0}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                    />
                    <ButtonKeyboard
                        style={styles.buttonKeyboard}
                        {...this.id("keyboard-button-backspace")}
                        icon="chevron-left"
                        variant={"clean"}
                        value={"delete"}
                        onPress={this.props.onKeyPress}
                        onLongPress={this.props.onKeyLongPress}
                        strokeWidth={3}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyboardNumeric: {
        width: "100%",
        minHeight: isTabletSize() ? 200 : 124,
        maxHeight: isTabletSize() ? 350 : 236,
        maxWidth: isTabletSize() ? 800 : 380,
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 5
    },
    buttonKeyboard: {
        marginHorizontal: isTabletSize() ? 4 : 2
    },
    filler: {
        flex: 1
    }
});

export default KeyboardNumeric;
