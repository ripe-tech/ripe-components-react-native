import React, { PureComponent } from "react";
import { ViewPropTypes, Text as RNText } from "react-native";

export class Text extends PureComponent {
    static get propTypes() {
        return {
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            style: {}
        };
    }

    _style = () => {
        return [
            this.props.style,
            {
                fontFamily: "Soleil",
                fontSize: 14,
                lineHeight: 22,
                color: "#3e566a"
            }
        ];
    };

    render() {
        return <RNText style={this._style()}>{this.props.children}</RNText>;
    }
}

export default Text;
