import React, { PureComponent } from "react";
import { ViewPropTypes } from "react-native";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";
import add from "../../../assets/icons/add.svg";
import chevronLeft from "../../../assets/icons/chevron-left.svg";
import mute from "../../../assets/icons/mute.svg";
import volumeLoud from "../../../assets/icons/volume-loud.svg";

export class Icon extends PureComponent {
    _icon() {
        const { icon } = this.props;
        switch (icon) {
            case "add":
                return add;
            case "chevron-left":
                return chevronLeft;
            case "mute":
                return mute;
            case "volume-loud":
                return volumeLoud;
            default:
                return null;
        }
    }

    render() {
        return (
            <SvgXml
                xml={this._icon()}
                height={this.props.height}
                width={this.props.width}
                stroke={this.props.color}
                strokeWidth={this.props.strokeWidth}
                style={this.props.style}
            />
        );
    }
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    color: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]),
    height: PropTypes.number,
    width: PropTypes.number,
    style: ViewPropTypes.style
};

Icon.defaultProps = {
    color: "#000000",
    height: 20,
    width: 20,
    strokeWidth: 1.5,
    style: {}
};
