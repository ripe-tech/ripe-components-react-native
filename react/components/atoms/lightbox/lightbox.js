import React, { PureComponent } from "react";
import {
    ViewPropTypes,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Modal,
    BackHandler
} from "react-native";

import PropTypes from "prop-types";

export class Lightbox extends PureComponent {
    static get propTypes() {
        return {
            src: PropTypes.string.isRequired,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            borderRadius: PropTypes.number,
            resizeMode: PropTypes.string,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            src: undefined,
            width: "100%",
            height: "100%",
            borderRadius: undefined,
            resizeMode: undefined
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    handleBackPress = () => {
        console.log("yeeeeeeeeeeeeeet");

        this.setState({
            visible: false
        });
    }

    onLightboxPress = () => {
        this.setState({
            visible: true
        });
    };
    
    _imageStyle = () => {
        return [{
            width: this.props.width,
            height: this.props.height,
            borderRadius: this.props.borderRadius,
            resizeMode: this.props.resizeMode
        }, this.props.style];
    };


    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.onLightboxPress()}>
                    <Image style={this._imageStyle()} source={{ uri: this.props.src }} />
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={() => this.handleBackPress()}>
                    <View style={styles.fullscreenContainer}>
                        <Image style={styles.fullscreenImage} source={{ uri: this.props.src }} />
                    </View>
                </Modal>
            </View>
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
        width: "100%",
        height: "100%",
        backgroundColor: "#000000"
    }
});

export default Lightbox;
