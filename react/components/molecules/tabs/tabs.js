import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes } from "react-native";
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
            ),
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            tabs: [],
            style: {}
        };
    }

    onPressTab = route => {
        this.props.navigation.navigate(route);
    };

    _isSelected = id => {
        return this.props.state.routeNames[this.props.state.index] === id;
    };

    _style = () => {
        return [styles.tabs, this.props.style];
    };

    render() {
        return (
            <SafeAreaView style={this._style()}>
                {this.props.tabs.map(tab =>
                    !tab.hidden ? (
                        <ButtonTab
                            key={tab.text}
                            text={tab.text}
                            color={tab.color}
                            colorSelected={tab.colorSelected}
                            disabled={tab.disabled}
                            badgeAnimationDuration={tab.badgeAnimationDuration}
                            badgeBackgroundColor={tab.badgeBackgroundColor}
                            badgeColor={tab.badgeColor}
                            badgeCount={tab.badgeCount}
                            badgeCountThreshold={tab.badgeCountThreshold}
                            badgeHasAnimation={tab.badgeHasAnimation}
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
    tabs: {
        paddingTop: 0,
        backgroundColor: "#ffffff",
        flexDirection: "row"
    }
});

export default Tabs;
