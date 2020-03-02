import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, Image, TouchableOpacity } from "react-native";

import PropTypes from "prop-types";

export class Avatar extends PureComponent {
    static get propTypes() {
        return {
            image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
            size: PropTypes.number,
            resizeMode: PropTypes.string,
            style: ViewPropTypes.style,
            onPress: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            resizeMode: "contain",
            size: 40,
            style: {},
            onPress: undefined
        };
    }

    hitSlop = { top: 20, left: 20, right: 20, bottom: 20 };

    _style = () => {
        return [
            {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size,
                overflow: "hidden"
            },
            this.props.style
        ];
    };

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                disabled={!this.props.onPress}
                hitSlop={this.hitSlop}
                style={this._style()}
            >
                <Image
                    source={this.props.image}
                    style={styles.image}
                    resizeMode={this.props.resizeMode}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%"
    }
});

export default Avatar;
