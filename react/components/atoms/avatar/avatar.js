import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, Image } from "react-native";
import { Touchable } from "../touchable";

import PropTypes from "prop-types";

export class Avatar extends PureComponent {
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
            style: ViewPropTypes.style,
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            size: 40,
            activeOpacity: 0.7,
            borderRadius: 100,
            resizeMode: "contain",
            hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
            style: {},
            onPress: undefined
        };
    }

    _style = () => {
        return [
            {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.borderRadius
            },
            this.props.style
        ];
    };
    _imageStyle = () => {
        return [
            styles.image,
            {
                width: this.props.size,
                height: this.props.size
            }
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
                    style={this._imageStyle()}
                    resizeMode={this.props.resizeMode}
                />
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        overflow: "hidden"
    }
});

export default Avatar;
