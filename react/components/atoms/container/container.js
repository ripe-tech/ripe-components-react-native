import React, { PureComponent } from "react";
import { ViewPropTypes, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import PropTypes from "prop-types";

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

    _style = () => {
        return [
            {
                backgroundColor: "#ffffff",
                borderRadius: 6,
                //TODO maybe improve shadow box ?
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowRadius: 5,
                shadowColor: "#435664",
                shadowOpacity: 0.3
            },
            this.props.style
        ];
    };

    render() {
        return (
            <View style={this._style()}>
                <LinearGradient
                    angle={this.props.gradientAngle}
                    colors={this.props.gradientColors}
                    locations={this.props.gradientLocations}
                    useAngle={true}
                >
                    <View>
{/*                         <Icon icon="bolt" width={32} height={32} color="#00ff00" />
                        <Text>TODO text here</Text>
                        <Text>TODO date here</Text> */}
                    </View>
                </LinearGradient>
                {this.props.children}
            </View>
        );
    }
}

export default Container;
