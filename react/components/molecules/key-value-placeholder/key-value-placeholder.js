import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

export class KeyValuePlaceholder extends PureComponent {
    static get propTypes() {
        return {
            numberOfLines: PropTypes.number,
            colors: PropTypes.arrayOf(PropTypes.string).isRequired,
            locations: PropTypes.arrayOf(PropTypes.number).isRequired
        };
    }

    static get defaultProps() {
        return {
            numberOfLines: 1
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
                    colors={this.props.colors}
                    locations={this.props.locations}
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
                        colors={this.props.colors}
                        locations={this.props.locations}
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
        height: 18,
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
