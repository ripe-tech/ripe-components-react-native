import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { ButtonIcon, Input } from "../../atoms";
import { baseStyles } from "../../../util";

export class Search extends PureComponent {
    static get propTypes() {
        return {
            value: PropTypes.string,
            placeholder: PropTypes.string,
            buttonProps: PropTypes.object,
            onValue: PropTypes.func,
            onFocus: PropTypes.func,
            onBlur: PropTypes.func,
            onClear: PropTypes.func,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            value: undefined,
            placeholder: "Search",
            buttonProps: {},
            onValue: () => {},
            onFocus: () => {},
            onBlur: () => {},
            onClear: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            valueData: this.props.value,
            buttonsVisible: true,
            focused: false
        };
    }

    focus = () => {
        this.textInputComponent.focus();
    };

    blur = () => {
        this.textInputComponent.blur();
    };

    clear = () => {
        this.setState({ valueData: "" }, () => {
            this.props.onValue("");
            this.props.onClear();
            this.focus();
        });
    };

    _icon = () => {
        return this.state.valueData ? "close" : "search";
    };

    onInputValue = value => {
        this.setState({ valueData: value }, () => {
            this.props.onValue(value);
        });
    };

    onInputFocus = () => {
        this.setState({ focused: true }, () => {
            this.props.onFocus();
        });
    };

    onInputBlur = () => {
        this.setState({ focused: false }, () => {
            this.props.onBlur();
        });
    };

    onButtonPress = () => {
        if (!this.state.valueData) return;
        this.clear();
    };

    _style = () => {
        return [styles.search, this.props.style];
    };

    render() {
        return (
            <View style={this._style()}>
                <Input
                    ref={el => (this.textInputComponent = el)}
                    style={styles.input}
                    value={this.state.valueData}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={"#223645"}
                    onValueUpdate={this.onInputValue}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                />
                <ButtonIcon
                    style={styles.button}
                    icon={this._icon()}
                    size={24}
                    iconStrokeColor={"#1d2631"}
                    iconStrokeWidth={2}
                    iconHeight={24}
                    iconWidth={24}
                    {...this.props.buttonProps}
                    onPress={this.onButtonPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    search: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative"
    },
    input: {
        flex: 1,
        color: "#223645",
        paddingBottom: 0,
        fontFamily: baseStyles.FONT,
        paddingTop: 0,
        borderRadius: 6,
        minHeight: 40,
        backgroundColor: "#ffffff"
    },
    button: {
        position: "absolute",
        backgroundColor: "transparent",
        top: 8,
        right: 18
    }
});

export default Search;
