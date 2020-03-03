import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import { Avatar } from "../../atoms/avatar";

export class ItemNotification extends PureComponent {
    static get propTypes() {
        return {
            unread: PropTypes.bool,
            avataURL: PropTypes.String,
            text: PropTypes.String,
            timestamp: PropTypes.Number
        };
    }

    static get defaultProps() {
        return {
            unread: false
        };
    }

    render() {
        return (
            <View style={styles.style}>
                <Avatar
                    image={{
                        uri: "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar"
                    }}
                    size={52}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    style: {},
    item: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 5
    }
});
