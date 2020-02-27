import React, { PureComponent } from "react";
import { ViewPropTypes, TouchableOpacity, Image } from "react-native";

import PropTypes from "prop-types";

export class Lightbox extends PureComponent {
    static get propTypes() {
        return {
            src: PropTypes.string.isRequired,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            borderRadius: PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            src: undefined,
            width: "100%",
            height: "100%",
            borderRadius: undefined
        };
    }

    onLightboxPress = () => {
        console.log("sup");
    };

    _style = () => {
        return [this.props.style];
    };

    _imageStyle = () => {
        return {
            width: this.props.width,
            height: this.props.height,
            borderRadius: this.props.borderRadius
        };
    };

    render() {
        return (
            <TouchableOpacity onPress={() => this.onLightboxPress()}>
                <Image style={this._imageStyle()} source={{ uri: this.props.src }} />
            </TouchableOpacity>
        );
    }
}

export default Lightbox;
