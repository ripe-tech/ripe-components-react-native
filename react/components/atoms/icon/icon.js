import React, { PureComponent } from "react";
import { Image, ViewPropTypes } from "react-native";
import { SvgCssUri, SvgXml } from "react-native-svg";
import PropTypes from "prop-types";
import { mix } from "yonius";

import { IdentifiableMixin } from "../../../util";
import icons from "../../../assets/icons/";

export class Icon extends mix(PureComponent).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
            strokeWidth: PropTypes.number,
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
        if (this._isSvgIcon()) return this.props.icon;
        if (icons[this.props.icon]) return icons[this.props.icon];
        throw new Error(`Unknown icon ${this.props.icon}`);
    }

    _isUriIcon() {
        return typeof this.props.icon === "number" || this.props.icon.startsWith("http");
    }

    _isSvgIcon() {
        return typeof this.props.icon === "string" && this.props.icon.startsWith("<svg");
    }

    _renderSvgUri() {
        const uri =
            typeof this.props.icon === "number"
                ? Image.resolveAssetSource(this.props.icon).uri
                : this.props.icon;
        return (
            <SvgCssUri
                uri={uri}
                height={this.props.height}
                width={this.props.width}
                fill={this.props.fill}
                stroke={this.props.color}
                strokeWidth={this.props.strokeWidth}
                style={this.props.style}
                {...this.id(`icon-${this.props.uri}`)}
            />
        );
    }

    _renderSvgXml() {
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

    render() {
        return this._isUriIcon() ? this._renderSvgUri() : this._renderSvgXml();
    }
}

export default Icon;
