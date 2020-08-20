import React, { PureComponent } from "react";
import { ViewPropTypes } from "react-native";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";

import { testId } from "../../../util";
import icons from "../../../assets/icons/";

export class Icon extends PureComponent {
    static get propTypes() {
        return {
            icon: PropTypes.string.isRequired,
            fill: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.arrayOf(PropTypes.number)
            ]),
            color: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.arrayOf(PropTypes.number)
            ]),
            height: PropTypes.number,
            width: PropTypes.number,
            style: ViewPropTypes.style,
            testId: PropTypes.string
        };
    }

    static get defaultProps() {
        return {
            fill: undefined,
            color: "#000000",
            height: 20,
            width: 20,
            strokeWidth: 1.5,
            style: {},
            testId: undefined
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
                fill={this.props.fill}
                stroke={this.props.color}
                strokeWidth={this.props.strokeWidth}
                style={this.props.style}
                {...testId(this.props.testId || `icon-${this.props.icon}`)}
            />
        );
    }
}

export default Icon;
