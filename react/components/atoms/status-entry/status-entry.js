import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { capitalize } from "ripe-commons-native";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Touchable } from "../touchable";
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
            style: {},
            styles: styles
        };
    }

    _style() {
        return [
            styles.statusEntry,
            this.props.style
        ];
    };

    render() {
        return (
            <View style={this._style()} {...this.id("status-entry")}>
                <Text style={styles.text}>{this.props.text}</Text>
                <Tag
                    text={this.props.status}
                    color={this.props.tagColor}
                    backgroundColor={this.props.backgroundColor}
                    borderColor={this.props.tagBorderColor}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusEntry: {
        overflow: "hidden",
        flexDirection: "row"
    },
    text: {
        fontFamily: baseStyles.FONT_BOOK
    }
});

export default StatusEntry;
