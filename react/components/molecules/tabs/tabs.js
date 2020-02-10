import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import PropTypes from "prop-types";

import { ButtonTab } from "../../atoms/button-tab";

export class Tabs extends PureComponent {
    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    icon: PropTypes.string.isRequired,
                    selected: PropTypes.bool,
                    disabled: PropTypes.bool
                })
            )
        };
    }

    static get defaultProps() {
        return {
            tabs: []
        };
    }

    onPressTab = route => {
        this.props.navigation.navigate(route);
    };

    _isSelected = id => {
        return this.props.state.routeNames[this.props.state.index] === id;
    };

    render() {
        const { tabs } = this.props;
        return (
            <View style={styles.root}>
                {tabs.map(tab => (
                    <ButtonTab
                        key={tab.text}
                        text={tab.text}
                        disabled={tab.disabled}
                        icon={tab.icon}
                        onPress={() => this.onPressTab(tab.id)}
                        selected={this._isSelected(tab.id)}
                    />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        flexDirection: "row"
    }
});
