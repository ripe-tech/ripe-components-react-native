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
            showNumber: PropTypes.number,
            style: ViewPropTypes.style,
            textStyle: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            label: undefined,
            size: 40,
            avatarProps: {},
            showNumber: 3,
            style: {},
            styles: styles
        };
    }

    _avatars() {
        if (this.props.avatars.length <= this.props.showNumber) return this.props.avatars;
        const reducedAvatars = this.props.avatars.slice(0, this.props.showNumber + 1);
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
                      marginLeft: -1 * (this.props.size / 3)
                  }
        ];
    }

    _avatarOverlayContainerStyle() {
        return [
            styles.avatarOverlayContainer,
            {
                width: this.props.size,
                height: this.props.size,
                marginLeft: -1 * (this.props.size / 3)
            }
        ];
    }

    _avatarOverlayText() {
        return [
            styles.textOverlay,
            {
                fontSize: this.props.size / 2 - 5
            }
        ];
    }

    _renderAvatars() {
        return this._avatars().map((avatar, index) => (
            <View>
                <Avatar
                    style={this._avatarStyle(index)}
                    key={index}
                    image={{ uri: avatar }}
                    size={this.props.size}
                    {...this.props.avatarProps}
                />
                {index >= this.props.showNumber && (
                    <View style={this._avatarOverlayContainerStyle()}>
                        <View style={styles.avatarOverlay} />
                        <Text style={this._avatarOverlayText()}>
                            + {this.props.avatars.length - this.props.showNumber}
                        </Text>
                    </View>
                )}
            </View>
        ));
    }

    render() {
        return (
            <View styles={styles.avatarList}>
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
        flex: 1,
        flexDirection: "row",
        backgroundColor: "yellow"
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
