import React, { PureComponent } from "react";
import { ViewPropTypes, StyleSheet, View, TouchableOpacity, Image, Modal } from "react-native";

import PropTypes from "prop-types";

export class Lightbox extends PureComponent {
    static get propTypes() {
        return {
            uri: PropTypes.string,
            source: PropTypes.string,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            borderRadius: PropTypes.number,
            resizeMode: PropTypes.string,
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
            this.props.onVisible(this.state.visible)
        );
    }

    onBackButtonPress = () => {
        this.setVisibility(false);
    };

    onLightboxPress = () => {
        this.setVisibility(true);
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

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.onLightboxPress()} activeOpacity={0.7}>
                    <Image
                        style={this._imageStyle()}
                        source={this.props.uri ? { uri: this.props.uri } : this.props.source}
                    />
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={() => this.onBackButtonPress()}
                >
                    <View style={styles.fullscreenContainer}>
                        <Image style={styles.fullscreenImage} source={{ uri: this.props.uri }} />
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullscreenImage: {
        flex: 1,
        resizeMode: "contain"
    },
    fullscreenContainer: {
        flex: 1,
        backgroundColor: "#000000"
    }
});

export default Lightbox;
