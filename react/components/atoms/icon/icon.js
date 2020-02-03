import React, { PureComponent } from "react";
import { StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

export class Icon extends PureComponent {
    _imageStyles = () => {
        return [styles.imageStyle, this.props.imageStyle];
    };

    _icon() {
        switch (this.props.icon) {
            case "add":
                return require("../../../assets/icons/add.svg");
            default:
                return null;
        }
    }

    render() {
        return <Image source={this._icon()} />;
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 20,
        width: 20
    }
});

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
