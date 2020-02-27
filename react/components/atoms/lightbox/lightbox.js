import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

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

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            width: this.props.width,
            height: this.props.height,
            borderRadius: this.props.borderRadius
        };
    }

    onLightboxPress = () => {
        this.setState({
            visible: true
        });
    };

    _style = () => {
        return [this.props.style];
    };

    _imageStyle = () => {
        return {
            width: this.state.width,
            height: this.state.height,
            borderRadius: this.state.borderRadius
        };
    };

    render() {
        const pressableImage = () => {
            return (
                <TouchableOpacity onPress={() => this.onLightboxPress()}>
                    <Image style={this._imageStyle()} source={{ uri: this.props.src }} />
                </TouchableOpacity>
            );
        };

        const fullscreenImage = () => {
            return (
                <View style={styles.fullscreenContainer}>
                    <Image style={styles.fullscreenImage} source={{ uri: this.props.src }} />
            </View>
            )
        };

        return (
            <View style={this.state.visible && styles.fullscreen}>
                {this.state.visible ? fullscreenImage() : pressableImage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullscreen: {
        position: "absolute",
        backgroundColor: "#000000",
        width: "100%",
        height: "100%"
    },
    fullscreenImage: {
        flex: 1,
        width: "100%",
        resizeMode: "contain"
    },
    fullscreenContainer: {
        flex:1
    }
});

export default Lightbox;
