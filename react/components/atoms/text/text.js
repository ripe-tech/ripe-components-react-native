import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, Text as RNText } from "react-native";

import { baseStyles } from "../../../util";

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
        return [styles.text, this.props.style];
    };

    render() {
        return <RNText style={this._style()}>{this.props.children}</RNText>;
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: baseStyles.FONT_BOOK,
        fontSize: 14,
        lineHeight: 22,
        color: "#3e566a"
    }
});

export default Text;
