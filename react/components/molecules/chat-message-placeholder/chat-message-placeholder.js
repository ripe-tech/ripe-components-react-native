import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import { PlaceholderContext, isTabletSize } from "ripe-commons-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

export class ChatMessagePlaceholder extends PureComponent {
    static get propTypes() {
        return {
            variant: PropTypes.string,
            style: PropTypes.any,
            itemStyle: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            variant: undefined,
            style: {},
            itemStyle: {}
        };
    }

    _style() {
        return [styles.chatMessage, this.props.style];
    }

    render() {
        return (
            <PlaceholderContext.Consumer>
                {({ placeholderLocations, placeholderColors }) => (
                    <View style={this._style()}>
                        <View style={styles.messageLeft}>
                            <LinearGradient
                                style={styles.avatar}
                                angle={90}
                                useAngle={true}
                                colors={placeholderColors}
                                locations={placeholderLocations}
                            />
                        </View>
                        <View style={styles.messageRight}>
                            <View style={styles.header}>
                                <LinearGradient
                                    style={styles.username}
                                    angle={90}
                                    useAngle={true}
                                    colors={placeholderColors}
                                    locations={placeholderLocations}
                                />
                                <LinearGradient
                                    style={styles.date}
                                    angle={90}
                                    useAngle={true}
                                    colors={placeholderColors}
                                    locations={placeholderLocations}
                                />
                            </View>
                            <View style={styles.content}>
                                <LinearGradient
                                    style={styles.text}
                                    angle={90}
                                    useAngle={true}
                                    colors={placeholderColors}
                                    locations={placeholderLocations}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </PlaceholderContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    chatMessage: {
        width: "100%",
        maxHeight: 120,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flex: 1,
        flexDirection: "row"
    },
    avatar: {
        backgroundColor: "pink",
        borderRadius: 100,
        height: 32,
        width: 32,
        marginEnd: 9,
        marginTop: 5
    },
    messageRight: {
        flex: 1,
        width: "100%",
        overflow: "hidden"
    },
    header: {
        justifyContent: "flex-start",
        flexDirection: "column",
        marginTop: 3
    },
    content: {
        paddingTop: 10
    },
    username: {
        height: 18,
        width: 140,
        backgroundColor: "cyan",
        marginBottom: 5
    },
    text: {
        height: 32,
        width: 300,
        backgroundColor: "indianred"
    },
    date: {
        height: 18,
        width: 100,
        backgroundColor: "orange"
    }
});
