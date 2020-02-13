import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, Image } from "react-native";

import PropTypes from "prop-types";

export class Avatar extends PureComponent {
    static get propTypes() {
        return {
            image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
            resizeMode: PropTypes.string,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            resizeMode: "contain",
            style: {}
        };
    }

    _imageStyles = () => {
        return [styles.image, this.props.style];
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

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
});
