import React, { PureComponent } from "react";
import { Image, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { equal, mix } from "yonius";

import { IdentifiableMixin } from "../../../util";

import { Touchable } from "../touchable";

export class Avatar extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
            label: PropTypes.string,
            size: PropTypes.number,
            activeOpacity: PropTypes.number,
            borderRadius: PropTypes.number,
            resizeMode: PropTypes.string,
            hitSlop: PropTypes.shape({
                top: PropTypes.number.isRequired,
                left: PropTypes.number.isRequired,
                right: PropTypes.number.isRequired,
                bottom: PropTypes.number.isRequired
            }),
            onPress: PropTypes.func,
            onError: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            label: undefined,
            size: 40,
            activeOpacity: 0.7,
            borderRadius: 100,
            resizeMode: "contain",
            hitSlop: { top: 20, left: 20, right: 20, bottom: 20 },
            onPress: undefined,
            onError: undefined,
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: this.props.image
        };
    }

    componentDidUpdate(prevProps) {
        if (!equal(prevProps.image, this.props.image)) {
            this.setState({ imageSrc: this.props.image });
        }
    }

    onLoadingError = () => {
        this.setState({ imageSrc: require("./assets/avatar.png") });
        if (this.props.onError) this.props.onError();
    };

    _style = () => {
        return [
            styles.avatar,
            {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.borderRadius
            },
            this.props.style
        ];
    };

    _labelStyle = () => {
        return [styles.label, { height: this.props.size / 4 }];
    };

    _labelTextStyle = () => {
        return [
            styles.labelText,
            {
                lineHeight: this.props.size / 8,
                fontSize: this.props.size / 10,
                maxWidth: this.props.size
            }
        ];
    };

    _renderLabel = () => {
        if (!this.props.label) return;

        return (
            <View style={this._labelStyle()}>
                <View style={styles.labelOpacity} />
                <Text style={this._labelTextStyle()} numberOfLines={1}>
                    {this.props.label}
                </Text>
            </View>
        );
    };

    render() {
        return (
            <Touchable
                style={this._style()}
                onPress={this.props.onPress}
                disabled={!this.props.onPress}
                activeOpacity={this.props.activeOpacity}
                hitSlop={this.props.hitSlop}
            >
                <Image
                    source={this.state.imageSrc}
                    style={styles.image}
                    resizeMode={this.props.resizeMode}
                    onError={this.onLoadingError}
                    {...this.id("avatar")}
                />
                {this._renderLabel()}
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    avatar: {
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    label: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        justifyContent: "center"
    },
    labelOpacity: {
        backgroundColor: "#000000",
        width: "100%",
        height: "100%",
        opacity: 0.5,
        position: "absolute"
    },
    labelText: {
        alignSelf: "center",
        color: "#ffffff",
        position: "absolute"
    }
});

export default Avatar;
