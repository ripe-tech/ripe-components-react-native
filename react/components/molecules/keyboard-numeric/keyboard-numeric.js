import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonKeyboard } from "../../";

import PropTypes from "prop-types";

export class KeyboardNumeric extends PureComponent {
    render() {
        const { onKeyPress } = this.props;
        return (
            <View style={styles.root}>
                <View style={styles.row}>
                    <ButtonKeyboard text={"1"} value={1} onPress={onKeyPress} />
                    <ButtonKeyboard text={"2"} value={2} onPress={onKeyPress} />
                    <ButtonKeyboard text={"3"} value={3} onPress={onKeyPress} />
                </View>
                <View style={styles.row}>
                    <ButtonKeyboard text={"4"} value={4} onPress={onKeyPress} />
                    <ButtonKeyboard text={"5"} value={5} onPress={onKeyPress} />
                    <ButtonKeyboard text={"6"} value={6} onPress={onKeyPress} />
                </View>
                <View style={styles.row}>
                    <ButtonKeyboard text={"7"} value={7} onPress={onKeyPress} />
                    <ButtonKeyboard text={"8"} value={8} onPress={onKeyPress} />
                    <ButtonKeyboard text={"9"} value={9} onPress={onKeyPress} />
                </View>
                <View style={styles.row}>
                    <View style={styles.filler} />
                    <ButtonKeyboard text={"0"} value={0} onPress={onKeyPress} />
                    <ButtonKeyboard
                        icon="chevron-left"
                        variant={"clean"}
                        value={"delete"}
                        onPress={onKeyPress}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
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

KeyboardNumeric.propTypes = {
    onKeyPress: PropTypes.func.isRequired
};
