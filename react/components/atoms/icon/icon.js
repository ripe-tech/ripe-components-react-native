import React, { PureComponent } from "react";
import { ViewPropTypes } from "react-native";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";
import icons from "../../../assets/icons/";

export class Icon extends mix(PureComponent).with(IdentifiableMixin) {
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
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            fill: undefined,
            color: "#000000",
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
                fill={this.props.fill}
                stroke={this.props.color}
                strokeWidth={this.props.strokeWidth}
                style={this.props.style}
                {...this.id(`icon-${this.props.icon}`)}
            />
        );
    }
}

export default Icon;
