import React, { PureComponent } from "react";
import { StyleSheet, Text as RNText } from "react-native";

import { baseStyles } from "../../../util";

export class Text extends PureComponent {
    static get propTypes() {
        return {
            style: RNText.propTypes.style
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
        fontSize: baseStyles.FONT_SIZE,
        lineHeight: 22,
        color: "#3e566a"
    }
});

export default Text;
