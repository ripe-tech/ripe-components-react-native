import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin, baseStyles } from "../../../util";

import { Avatar, Text } from "../../atoms";

export class AvatarList extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            avatars: PropTypes.arrayOf(PropTypes.string).isRequired,
            size: PropTypes.number,
            avatarProps: PropTypes.object,
            visibleAvatars: PropTypes.number,
            style: ViewPropTypes.style,
            textStyle: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            label: undefined,
            size: 40,
            avatarProps: {},
            visibleAvatars: 3,
            style: {}
        };
    }

    _avatars() {
        if (this.props.avatars.length <= this.props.visibleAvatars) return this.props.avatars;
        const reducedAvatars = this.props.avatars.slice(0, this.props.visibleAvatars + 1);
        return reducedAvatars;
    }

    _style() {
        return [styles.avatarList, this.props.style];
    }

    _avatarStyle(index) {
        return [
            index === 0
                ? {
                      marginLeft: 0
                  }
                : {
                      marginLeft: -1 * (this.props.size / 2)
                  }
        ];
    }

    _avatarOverlayContainerStyle() {
        return [
            styles.avatarOverlayContainer,
            {
                width: this.props.size,
                height: this.props.size,
                marginLeft: -1 * (this.props.size / 2)
            }
        ];
    }

    _avatarOverlayText() {
        return [
            styles.textOverlay,
            {
                // the required line height so that the text always
                // appears vertically centered in the middle of the
                // avatar image
                lineHeight: this.props.size / 2 + this.props.size / 8,
                fontSize: this.props.size / 2
            }
        ];
    }

    _renderAvatars() {
        return this._avatars().map((avatar, index) => (
            <View>
                <Avatar
                    style={this._avatarStyle(index)}
                    key={`${avatar}-${index}`}
                    image={{ uri: avatar }}
                    size={this.props.size}
                    {...this.props.avatarProps}
                />
                {index >= this.props.visibleAvatars && (
                    <View style={this._avatarOverlayContainerStyle()}>
                        <View style={styles.avatarOverlay} />
                        <Text style={this._avatarOverlayText()}>
                            + {this.props.avatars.length - this.props.visibleAvatars}
                        </Text>
                    </View>
                )}
            </View>
        ));
    }

    render() {
        return (
            <View styles={this._style()}>
                <View style={styles.avatars}>{this._renderAvatars()}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avatarList: {
        overflow: "hidden",
        flexDirection: "row"
    },
    avatars: {
        flexDirection: "row"
    },
    avatarOverlayContainer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        overflow: "hidden"
    },
    avatarOverlay: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#000000",
        opacity: 0.4
    },
    textOverlay: {
        fontFamily: baseStyles.FONT,
        color: "#ffffff",
        lineHeight: undefined
    }
});

export default AvatarList;
