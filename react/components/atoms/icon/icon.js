import React, { PureComponent } from "react";
import { ViewPropTypes } from "react-native";
import { SvgXml } from "react-native-svg";
import PropTypes from "prop-types";
import add from "../../../assets/icons/add.svg";
import chevronLeft from "../../../assets/icons/chevron-left.svg";

import search from "../../../assets/icons/search.svg";
import qr from "../../../assets/icons/qr.svg";
import inboxAlt from "../../../assets/icons/inbox-alt.svg";
import id from "../../../assets/icons/id.svg";
import bell from "../../../assets/icons/bell.svg";
import user from "../../../assets/icons/user.svg";
import mute from "../../../assets/icons/mute.svg";
import volumeLoud from "../../../assets/icons/volume-loud.svg";
import bolt from "../../../assets/icons/bolt.svg";
import chatAlt from "../../../assets/icons/chat-alt.svg";

export class Icon extends PureComponent {
    static get propTypes() {
        return {
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
    }

    static get defaultProps() {
        return {
            color: "#000000",
            height: 20,
            width: 20,
            strokeWidth: 1.5,
            style: {}
        };
    }

    _icon() {
        switch (this.props.icon) {
            case "add":
                return add;
            case "chevron-left":
                return chevronLeft;
            case "search":
                return search;
            case "qr":
                return qr;
            case "inbox-alt":
                return inboxAlt;
            case "id":
                return id;
            case "bell":
                return bell;
            case "user":
                return user;
            case "mute":
                return mute;
            case "volume-loud":
                return volumeLoud;
            case "bolt":
                return bolt;
            case "chat-alt":
                return chatAlt;
            default:
                throw new Error(`Unknown icon ${this.props.icon}`);
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
