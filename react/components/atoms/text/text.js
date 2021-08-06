import React, { PureComponent } from "react";
import { StyleSheet, Text as RNText } from "react-native";
import PropTypes from "prop-types";

import { baseStyles } from "../../../util";

export class Text extends PureComponent {
    static get propTypes() {
        return {
            style: RNText.propTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            style: {},
            styles: styles
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
