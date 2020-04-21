import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, View, Image, Modal } from "react-native";
import PropTypes from "prop-types";

import { Touchable } from "../touchable";

export class Lightbox extends PureComponent {
    static get propTypes() {
        return {
            uri: PropTypes.string,
            src: PropTypes.string,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            borderRadius: PropTypes.number,
            resizeMode: PropTypes.string,
            resizeModeFullScreen: PropTypes.string,
            style: ViewPropTypes.style,
            onVisible: PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            uri: undefined,
            src: undefined,
            width: "100%",
            height: "100%",
            borderRadius: undefined,
            resizeMode: undefined,
            resizeModeFullScreen: undefined,
            style: {},
            onVisible: () => {}
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    setVisibility(value) {
        this.setState(
            {
                visible: value
            },
            this.props.onVisible(value)
        );
    }

    onBackButtonPress = () => {
        this.setVisibility(false);
    };

    onLightboxPress = () => {
        this.setVisibility(true);
    };

    _imageSource = () => {
        return this.props.uri ? { uri: this.props.uri } : this.props.src;
    };

    _imageStyle = () => {
        return [
            {
                width: this.props.width,
                height: this.props.height,
                borderRadius: this.props.borderRadius,
                resizeMode: this.props.resizeMode
            },
            this.props.style
        ];
    };

    _imageFullscreenStyle = () => {
        return [
            styles.imageFullscreen,
            {
                resizeMode: this.props.resizeModeFullScreen
            }
        ];
    };

    render() {
        return (
            <View>
                <Touchable onPress={this.onLightboxPress} activeOpacity={0.7}>
                    <Image style={this._imageStyle()} source={this._imageSource()} />
                </Touchable>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={this.onBackButtonPress}
                >
                    <View style={styles.fullscreenContainer}>
                        <Image style={this._imageFullscreenStyle()} source={this._imageSource()} />
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        resizeMode: "contain"
    },
    imageFullscreen: {
        flex: 1,
        resizeMode: "contain"
    },
    fullscreenContainer: {
        flex: 1,
        backgroundColor: "#000000"
    }
});

export default Lightbox;
