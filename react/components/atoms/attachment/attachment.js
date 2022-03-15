import React, { Component } from "react";
import { Linking, StyleSheet, Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

import { Icon } from "../icon";
import { Touchable } from "../touchable";

export class Attachment extends Component {
    static get propTypes() {
        return {
            filename: PropTypes.string.isRequired,
            extension: PropTypes.string,
            url: PropTypes.string,
            underlayColor: PropTypes.string,
            activeOpacity: PropTypes.number,
            onPress: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            extension: undefined,
            url: undefined,
            underlayColor: "#f3f5ff",
            activeOpacity: 0.8,
            onPress: () => {},
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    onPress = event => {
        if (this.props.url) {
            Linking.openURL(this.props.url);
        } else if (this.props.onPress) {
            this.props.onPress(event);
        }
    };

    _extension() {
        if (this.props.extension) return this.props.extension;

        const extensionIndex = this.props.filename.lastIndexOf(".");
        if (extensionIndex === -1) return;

        return this.props.filename.substr(extensionIndex + 1);
    }

    _style() {
        return [styles.attachment, this.props.style];
    }

    render() {
        return (
            <View style={this._style()}>
                <Touchable
                    style={styles.touchable}
                    underlayColor={this.props.underlayColor}
                    activeOpacity={this.props.activeOpacity}
                    onPress={() => this.onPress()}
                >
                    <View style={styles.attachmentContainer}>
                        <View style={styles.image}>
                            <View style={styles.iconContainer}>
                                <Icon icon={"file"} color={"#ffffff"} height={25} width={25} />
                            </View>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.file} numberOfLines={1}>
                                {this.props.filename}
                            </Text>
                            <Text style={styles.extension}>
                                {this._extension().toUpperCase()} file
                            </Text>
                        </View>
                    </View>
                </Touchable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    attachment: {
        width: 270,
        height: 65,
        borderRadius: 13,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#dfe2e5",
        overflow: "hidden"
    },
    touchable: {
        flex: 1,
        padding: 6
    },
    attachmentContainer: {
        flex: 1,
        flexDirection: "row"
    },
    image: {
        flex: 1
    },
    iconContainer: {
        flex: 1,
        backgroundColor: "#6051f2",
        borderRadius: 7,
        aspectRatio: 1,
        marginVertical: 5,
        marginHorizontal: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    info: {
        flex: 3,
        flexDirection: "column",
        alignSelf: "center",
        marginRight: 5
    },
    file: {
        fontFamily: baseStyles.FONT_BOLD,
        color: "#1d2631",
        fontSize: 16,
        lineHeight: 18
    },
    extension: {
        fontFamily: baseStyles.FONT,
        color: "#1d2631",
        fontSize: 14,
        lineHeight: 16
    }
});

export default Attachment;
