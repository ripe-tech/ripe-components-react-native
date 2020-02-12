import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";

import PropTypes from "prop-types";

import { ButtonTab } from "../../atoms/button-tab";
import { SafeAreaView } from "react-native-safe-area-context";

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
            <SafeAreaView style={styles.root}>
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
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 0,
        backgroundColor: "#ffffff",
        flexDirection: "row"
    }
});
