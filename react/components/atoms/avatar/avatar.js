import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { Touchable } from "../touchable";

export class Avatar extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
            size: PropTypes.number,
            activeOpacity: PropTypes.number,
            borderRadius: PropTypes.number,
            resizeMode: PropTypes.string,
            hitSlop: PropTypes.shape({
                top: PropTypes.number.isRequired,
                left: PropTypes.number.isRequired,
                right: PropTypes.number.isRequired,
                bottom: PropTypes.number.isRequired
            }),
            onPress: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            size: 40,
            activeOpacity: 0.7,
            borderRadius: 100,
            resizeMode: "contain",
            hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
            onPress: undefined,
            style: {}
        };
    }

    _style = () => {
        return [
            styles.avatar,
            {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.borderRadius
            },
            this.props.style
        ];
    };

    render() {
        return (
            <Touchable
                style={this._style()}
                onPress={this.props.onPress}
                disabled={!this.props.onPress}
                activeOpacity={this.props.activeOpacity}
                hitSlop={this.props.hitSlop}
            >
                <Image
                    source={this.props.image}
                    style={styles.image}
                    resizeMode={this.props.resizeMode}
                    {...this.id("avatar")}
                />
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    avatar: {
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    }
});

export default Avatar;
