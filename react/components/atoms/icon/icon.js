import React, { PureComponent } from "react";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";
import add from "../../../assets/icons/add.svg";

export class Icon extends PureComponent {
    _icon() {
        switch (this.props.icon) {
            case "add":
                return add;
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

Icon.defaultProps = {
    color: "#000000",
    height: 20,
    width: 20,
    strokeWidth: 1.5,
    style: {}
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    color: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]),
    height: PropTypes.number,
    width: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
