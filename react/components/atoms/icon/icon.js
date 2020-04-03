import React, { PureComponent } from "react";
import { ViewPropTypes } from "react-native";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";

import icons from "../../../assets/icons/";

export class Icon extends PureComponent {
    static get propTypes() {
        return {
            icon: PropTypes.string.isRequired,
            color: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.arrayOf(PropTypes.number)
            ]),
            fill: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.arrayOf(PropTypes.number)
            ]),
            height: PropTypes.number,
            width: PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            color: "#000000",
            fill: undefined,
            height: 20,
            width: 20,
            strokeWidth: 1.5,
            style: {}
        };
    }

    _icon() {
        if (icons[this.props.icon]) return icons[this.props.icon];
        throw new Error(`Unknown icon ${this.props.icon}`);
    }

    render() {
        return (
            <SvgXml
                xml={this._icon()}
                height={this.props.height}
                width={this.props.width}
                stroke={this.props.color}
                fill={this.props.fill}
                strokeWidth={this.props.strokeWidth}
                style={this.props.style}
            />
        );
    }
}

export default Icon;
