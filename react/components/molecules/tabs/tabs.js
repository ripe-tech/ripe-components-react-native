import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
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
                    disabled: PropTypes.bool,
                    hidden: PropTypes.bool
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
        return (
            <SafeAreaView style={styles.root}>
                {this.props.tabs.map(tab =>
                    !tab.hidden ? (
                        <ButtonTab
                            key={tab.text}
                            text={tab.text}
                            disabled={tab.disabled}
                            icon={tab.icon}
                            onPress={() => this.onPressTab(tab.id)}
                            selected={this._isSelected(tab.id)}
                        />
                    ) : null
                )}
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
