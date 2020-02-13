import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, Image } from "react-native";

import PropTypes from "prop-types";

export class Avatar extends PureComponent {
    static get propTypes() {
        return {
            image: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.object.isRequired])
                .isRequired,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            style: []
        };
    }

    _imageStyles = () => {
        return [styles.image, this.props.style];
    };

    render() {
        const { image } = this.props;
        return <Image source={image} style={this._imageStyles()} resizeMode={"contain"} />;
    }
}

const styles = StyleSheet.create({
    image: {}
});
