import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, View, TouchableOpacity, Image, Animated } from "react-native";

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
            borderRadius: this.props.borderRadius,
            fadeValue: new Animated.Value(0)
        };
    }

    onLightboxPress = () => {
        this.startAnimation();
        this.setState({
            visible: true
        });
    };

    startAnimation = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 1000
        }).start();
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

    _fullscreenStyle = () => {
        if (!this.state.visible) return;

        this.startAnimation();

        return {
            position: "absolute",
            backgroundColor: "#000000",
            width: "100%",
            height: "100%",
            opacity: this.state.fadeValue
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
            );
        };

        return (
            <Animated.View style={this._fullscreenStyle()}>
                {this.state.visible ? fullscreenImage() : pressableImage()}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    fullscreenImage: {
        flex: 1,
        width: "100%",
        resizeMode: "contain"
    },
    fullscreenContainer: {
        flex: 1
    }
});

export default Lightbox;
