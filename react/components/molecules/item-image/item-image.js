import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Image, View } from "react-native";
import PropTypes from "prop-types";
import { ButtonIcon } from "../../";

export class ItemImage extends PureComponent {
    constructor(props) {
        super(props);

        this.hitBox = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        };
    }

    static get propTypes() {
        return {
            icon: PropTypes.string,
            iconBackgroundColor: PropTypes.string,
            iconColor: PropTypes.string,
            iconSize: PropTypes.number,
            iconStrokeWidth: PropTypes.number,
            onPressImage: PropTypes.func,
            size: PropTypes.number.isRequired,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            icon: "close",
            iconBackgroundColor: "rgba(255, 255, 255, 0.8)",
            iconColor: "#213054",
            iconSize: 20,
            iconStrokeWidth: 2,
            onPressImage: undefined,
            size: 80,
            style: {}
        };
    }

    onPress = () => {
        this.props.onPressImage(this.props.index);
    };

    _styles() {
        return [
            styles.itemImage,
            {
                width: this.props.size,
                height: this.props.size
            },
            this.props.style
        ];
    }

    _iconStyles() {
        return [
            styles.icon,
            {
                right: -(this.props.iconSize / 4),
                top: -(this.props.iconSize / 4)
            }
        ];
    }

    render() {
        return (
            <View style={this._styles()}>
                <View style={styles.containerImage}>
                    <Image source={this.props.image} style={styles.image} resizeMode={"cover"} />
                </View>
                {this.props.onPressImage ? (
                    <ButtonIcon
                        backgroundColor={this.props.iconBackgroundColor}
                        icon={this.props.icon}
                        color={this.props.iconColor}
                        iconWidth={18}
                        iconHeight={18}
                        iconStrokeWidth={2}
                        size={this.props.iconSize}
                        style={this._iconStyles()}
                        onPress={this.onPress}
                        hitBox={this.hitBox}
                    />
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemImage: {
        borderRadius: 6
    },
    containerImage: {
        borderRadius: 6,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    icon: {
        position: "absolute"
    }
});