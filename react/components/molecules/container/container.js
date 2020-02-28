import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import PropTypes from "prop-types";

import { Icon, /* Text */ } from "../../atoms";

export class Container extends PureComponent {
    static get propTypes() {
        return {
            header: PropTypes.bool,
            headerIcon: PropTypes.string,
            headerDate: PropTypes.number,
            gradientAngle: PropTypes.number,
            gradientColors: PropTypes.arrayOf(PropTypes.string),
            gradientLocations: PropTypes.arrayOf(PropTypes.number),
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            header: false,
            headerIcon: undefined,
            headerDate: undefined,
            gradientAngle: 62,
            gradientLocations: [0.4, 0.84],
            gradientColors: ["#4a6fe9", "#6687f6"],
            style: {}
        };
    }

    render() {
        return (
            <View style={[styles.container ,this.props.style]}>
                <LinearGradient
                    angle={this.props.gradientAngle}
                    colors={this.props.gradientColors}
                    locations={this.props.gradientLocations}
                    useAngle={true}
                >
                    <View>
                        <Icon icon={this.props.headerIcon} width={24} height={24} color="#ffffff" />
{/*                         <Text>TODO text here</Text>
                        <Text>TODO date here</Text> */}
                    </View>
                </LinearGradient>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowColor: "#435664",
        shadowOpacity: 0.2
    }
})

export default Container;
