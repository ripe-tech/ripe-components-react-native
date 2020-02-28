import React, { PureComponent } from "react";
import { ViewPropTypes, Image, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

export class Avatar extends PureComponent {
    static get propTypes() {
        return {
            image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
            size: PropTypes.number,
            resizeMode: PropTypes.string,
            style: ViewPropTypes.style,
            onPress: PropTypes.func,
            hitSlop: PropTypes.shape({
                top: PropTypes.number,
                right: PropTypes.number,
                bottom: PropTypes.number,
                left: PropTypes.number
            }).isRequired
        };
    }

    static get defaultProps() {
        return {
            resizeMode: "contain",
            size: 40,
            style: {},
            onPress: undefined,
            hitSlop: { top: 20, left: 20, right: 20, bottom: 20 }
        };
    }

    _imageStyles = () => {
        return [
            this.props.style,
            {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size
            }
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
                    style={this._imageStyles()}
                    resizeMode={this.props.resizeMode}
                />
            </TouchableOpacity>
        );
    }
}

export default Avatar;
