import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import PropTypes from "prop-types";

export class KeyValuePlaceholder extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            gradientPosition: [0, 0, 0]
        };
    }

    static get propTypes() {
        return {
            numberOfLines: PropTypes.number,
            gradientColors: PropTypes.arrayOf(PropTypes.string)
        };
    }

    static get defaultProps() {
        return {
            numberOfLines: 1,
            gradientColors: ["#DBDEE5", "#E3E6ED", "#DBDEE5"]
        };
    }

    _renderLines() {
        const componentsToReturn = [];

        for (let index = 0; index < this.props.numberOfLines; index++) {
            componentsToReturn.push(
                <LinearGradient
                    key={index}
                    style={styles.value}
                    angle={90}
                    useAngle={true}
                    colors={this.props.gradientColors}
                    locations={this.state.gradientPosition}
                />
            );
        }
        return componentsToReturn;
    }

    render() {
        return (
            <View style={styles.sectionViewPlaceholder}>
                <View style={styles.textContainer}>
                    <LinearGradient
                        style={styles.key}
                        angle={90}
                        useAngle={true}
                        colors={this.props.gradientColors}
                        locations={this.state.gradientPosition}
                    />
                    {this._renderLines()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sectionViewPlaceholder: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e4e8f0"
    },
    textContainer: {
        flex: 1
    },
    key: {
        borderRadius: 4,
        height: 18.5,
        width: 60,
        marginBottom: 4
    },
    value: {
        marginTop: 4,
        borderRadius: 4,
        height: 18,
        width: 120
    }
});
