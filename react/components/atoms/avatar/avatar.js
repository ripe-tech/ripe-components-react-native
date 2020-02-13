import React, { PureComponent } from "react";
import { ViewPropTypes, Image } from "react-native";

import PropTypes from "prop-types";

export class Avatar extends PureComponent {
    static get propTypes() {
        return {
            image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
            size: PropTypes.number,
            resizeMode: PropTypes.string,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            resizeMode: "contain",
            size: 40,
            style: {}
        };
    }

    _imageStyles = () => {
        return [
            this.props.style,
            { width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2 }
        ];
    };

    render() {
        return (
            <Image
                source={this.props.image}
                style={this._imageStyles()}
                resizeMode={this.props.resizeMode}
            />
        );
    }
}
