import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import { ButtonKeyboard } from "../../atoms/button-keyboard";

export class KeyboardNumeric extends PureComponent {
    static get propTypes() {
        return {
            onKeyPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            onKeyPress: value => {}
        };
    }

    render() {
        return (
            <View style={styles.style}>
                <View style={styles.row}>
                    <ButtonKeyboard text={"1"} value={1} onPress={this.props.onKeyPress} />
                    <ButtonKeyboard text={"2"} value={2} onPress={this.props.onKeyPress} />
                    <ButtonKeyboard text={"3"} value={3} onPress={this.props.onKeyPress} />
                </View>
                <View style={styles.row}>
                    <ButtonKeyboard text={"4"} value={4} onPress={this.props.onKeyPress} />
                    <ButtonKeyboard text={"5"} value={5} onPress={this.props.onKeyPress} />
                    <ButtonKeyboard text={"6"} value={6} onPress={this.props.onKeyPress} />
                </View>
                <View style={styles.row}>
                    <ButtonKeyboard text={"7"} value={7} onPress={this.props.onKeyPress} />
                    <ButtonKeyboard text={"8"} value={8} onPress={this.props.onKeyPress} />
                    <ButtonKeyboard text={"9"} value={9} onPress={this.props.onKeyPress} />
                </View>
                <View style={styles.row}>
                    <View style={styles.filler} />
                    <ButtonKeyboard text={"0"} value={0} onPress={this.props.onKeyPress} />
                    <ButtonKeyboard
                        icon="chevron-left"
                        variant={"clean"}
                        value={"delete"}
                        onPress={this.props.onKeyPress}
                        strokeWidth={3}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    style: {
        width: "100%",
        minHeight: 124,
        maxHeight: 236,
        maxWidth: 380,
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 5
    },
    filler: {
        flex: 1
    }
});

export default KeyboardNumeric;
