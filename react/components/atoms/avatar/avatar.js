import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, Image, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

export class Avatar extends PureComponent {
    static get propTypes() {
        return {
            image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
            size: PropTypes.number,
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
            resizeMode: "contain",
            hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
            style: {},
            onPress: undefined
        };
    }

    _imageStyle = () => {
        return [
            styles.image,
            {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size
            },
            this.props.style
        ];
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                disabled={!this.props.onPress}
                hitSlop={this.props.hitSlop}
            >
                <Image
                    source={this.props.image}
                    style={this._imageStyle()}
                    resizeMode={this.props.resizeMode}
                />
            </TouchableOpacity>
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
