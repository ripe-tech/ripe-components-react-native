import React, { PureComponent } from "react";
import { ViewPropTypes, View, Text } from "react-native";

import PropTypes from "prop-types";

export class Container extends PureComponent {
    static get propTypes() {
        return {
            header: PropTypes.bool,
            headerIcon: PropTypes.string,
            headerDate: PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            header: false,
            headerIcon: undefined,
            headerDate: undefined,
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

    propsTest = () => {
        return `${this.props.header}\n${this.props.headerIcon}\n${this.props.headerDate}`;
    };

    render() {
        return (
            <View style={this._style()}>
                <Text>{this.propsTest()}</Text>
            </View>
        );
    }
}

export default Container;
