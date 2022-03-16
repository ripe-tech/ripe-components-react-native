import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { Avatar } from "../../atoms";

export class AvatarList extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            avatars: PropTypes.arrayOf(PropTypes.string).isRequired,
            size: PropTypes.number,
            avatarProps: PropTypes.object,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            label: undefined,
            size: 40,
            avatarProps: {},
            style: {},
            styles: styles
        };
    }
    _style() {
        return [styles.avatarList, this.props.style];
    }

    _avatarStyle(index) {
        return [
            styles.avatar,
            index > 0
                ? {
                      marginLeft: -10
                  }
                : {}
        ];
    }

    _renderAvatars() {
        return this.props.avatars.map((avatar, index) => (
            <Avatar
                style={this._avatarStyle()}
                image={{ uri: avatar }}
                size={this.props.size}
                {...this.props.avatarProps}
            />
        ));
    }

    render() {
        return <View styles={this._style()}>{this._renderAvatars()}</View>;
    }
}

const styles = StyleSheet.create({
    avatarList: {
        overflow: "hidden",
        flexDirection: "column",
        width: "100%"
    },
    avatar: {
        // flex: 0
    }
});

export default AvatarList;
