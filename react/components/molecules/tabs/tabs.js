import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import PropTypes from "prop-types";

import { ButtonTab } from "../../atoms";

export class Tabs extends PureComponent {
    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    icon: PropTypes.string.isRequired,
                    color: PropTypes.string,
                    colorSelected: PropTypes.string,
                    fill: PropTypes.string,
                    fillSelected: PropTypes.string,
                    selected: PropTypes.bool,
                    disabled: PropTypes.bool,
                    hidden: PropTypes.bool,
                    props: PropTypes.object
                })
            ),
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            tabs: [],
            style: {},
            styles: styles
        };
    }

    onPressTab = route => {
        if (this._isSelected(route)) {
            this.props.navigation.emit({
                type: "tabPress",
                canPreventDefault: true
            });
        } else {
            this.props.navigation.navigate(route);
        }
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
                            fill={tab.fill}
                            fillSelected={tab.fillSelected}
                            badgeAnimationDuration={tab.badgeAnimationDuration}
                            badgeBackgroundColor={tab.badgeBackgroundColor}
                            badgeColor={tab.badgeColor}
                            badgeCount={tab.badgeCount}
                            badgeCountThreshold={tab.badgeCountThreshold}
                            badgeHasAnimation={tab.badgeHasAnimation}
                            icon={tab.icon}
                            {...tab.props}
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
