import React, { PureComponent } from "react";
import {
    ViewPropTypes,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions
} from "react-native";

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
            fadeAnimationValue: new Animated.Value(0),
            widthAnimationValue: new Animated.Value(1),
            heightAnimationValue: new Animated.Value(1),
            translateXAnimationValue: new Animated.Value(0),
            translateYAnimationValue: new Animated.Value(0)
        };

        this.screenWidth = Dimensions.get("window").width;
        this.screenHeight = Dimensions.get("window").height;
    }

    onLightboxPress = () => {
        this.setState({
            visible: true
        });
    };

    startAnimation = () => {
        const openAnimationTime = 5000;

        const scale = this.screenWidth / this.props.width;

        const finalPosX = this.screenWidth / 4;
        const finalPosY = this.props.height * scale;

        Animated.parallel([
            Animated.timing(this.state.fadeAnimationValue, {
                toValue: 1,
                duration: 200
            }),
            Animated.timing(this.state.widthAnimationValue, {
                toValue: scale,
                duration: openAnimationTime
            }),
            Animated.timing(this.state.heightAnimationValue, {
                toValue: scale,
                duration: openAnimationTime
            }),
            Animated.timing(this.state.translateXAnimationValue, {
                toValue: finalPosX,
                duration: openAnimationTime
            }),
            Animated.timing(this.state.translateYAnimationValue, {
                toValue: finalPosY,
                duration: openAnimationTime
            })
        ]).start();
    };

    _translateStyle = () => {
        this.startAnimation();

        return {
            width: this.screenWidth/2,
            height: this.screenWidth/2,
            transform: [
                { translateX: this.state.translateXAnimationValue },
                { translateY: this.state.translateYAnimationValue }
            ]
        };
    };

    _imageStyle = () => {
        return {
            width: this.state.width,
            height: this.state.height,
            borderRadius: this.state.borderRadius,
            resizeMode: "contain"
        };
    };

    _fullscreenImageStyle = () => {
        /*         const finalWidth = this.screenWidth;
        this.props.width */

        return {
            flex: 1,
            alignSelf: "center",
            width: this.props.width,
            //height: this.props.height,
            resizeMode: "contain",
            transform: [
                { scaleX: this.state.widthAnimationValue },
                { scaleY: this.state.heightAnimationValue }
            ]
        };
    };

    _fullscreenStyle = () => {
        if (!this.state.visible) return;

        this.startAnimation();

        return {
            position: "absolute",
            zIndex: 1,
            backgroundColor: "#000000",
            width: this.screenWidth,
            height: this.screenHeight,
            opacity: this.state.fadeAnimationValue
        };
    };

    render() {
        const pressableImage = () => {
            return (
                <TouchableOpacity onPress={() => this.onLightboxPress()} activeOpacity={0.8}>
                    <Image style={this._imageStyle()} source={{ uri: this.props.src }} />
                </TouchableOpacity>
            );
        };

        const fullscreenImage = () => {
            return (
                <Animated.View style={this._translateStyle()}>
                    <Animated.Image
                        style={this._fullscreenImageStyle()}
                        source={{ uri: this.props.src }}
                    />
                </Animated.View>
            );
        };

        return (
            <Animated.View style={[this._fullscreenStyle(), this.props.style]}>
                {this.state.visible ? fullscreenImage() : pressableImage()}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
});

export default Lightbox;
