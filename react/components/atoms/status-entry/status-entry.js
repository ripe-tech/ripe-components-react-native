import React, { PureComponent } from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Tag } from "../tag";

export class StatusEntry extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            status: PropTypes.string.isRequired,
            text: PropTypes.string,
            tagColor: PropTypes.string,
            tagBackgroundColor: PropTypes.string,
            tagBorderColor: PropTypes.string,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            text: "Changed order status to",
            backgroundColor: "rgba(96, 81, 242, 0.06)",
            borderColor: "rgba(96, 81, 242, 0.4)",
            tagColor: "#57626e",
            tagBackgroundColor: "#eceef1",
            tagBorderColor: "transparent",
            style: {},
            styles: styles
        };
    }

    _style() {
        return [
            styles.statusEntry,
            {
                backgroundColor: this.props.backgroundColor,
                borderColor: this.props.borderColor
            },
            this.props.style
        ];
    }

    render() {
        return (
            <View style={this._style()} {...this.id("status-entry")}>
                <Text style={styles.text}>{this.props.text}</Text>
                <Tag
                    text={this.props.status.toUpperCase()}
                    color={this.props.tagColor}
                    backgroundColor={this.props.tagBackgroundColor}
                    borderColor={this.props.tagBorderColor}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusEntry: {
        width: "100%",
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 7,
        padding: 8
    },
    text: {
        fontFamily: baseStyles.FONT_BOOK
    }
});

export default StatusEntry;
