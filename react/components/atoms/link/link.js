import React, { PureComponent } from "react";
import { StyleSheet, Text } from "react-native";

import PropTypes from "prop-types";

export class Link extends PureComponent {
    static get propTypes() {
        return {
            text: PropTypes.string,
            url: PropTypes.string.isRequired
        };
    }

    static get defaultProps() {
        return {
            text: undefined,
            url: undefined
        };
    }

    teste = () => {
        return `${this.props.text} - ${this.props.url}`;
    };

    render() {
        return (
            <Text style={styles.text}>{this.props.text ? this.props.text : this.props.url}</Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        //TODO
    }
});

export default Link;
