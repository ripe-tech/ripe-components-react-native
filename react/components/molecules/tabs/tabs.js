import React, { PureComponent } from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import PropTypes from "prop-types";

import { BarAnimated, ButtonTab } from "../../atoms";

export class Tabs extends PureComponent {
    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    icon: PropTypes.string.isRequired,
                    iconSelected: PropTypes.string,
                    iconStrokeWidth: PropTypes.number,
                    iconSelectedStrokeWidth: PropTypes.number,
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
            hasAnimation: PropTypes.bool,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            tabs: [],
            hasAnimation: true,
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            animatedBarWidth: undefined,
            animatedBarOffset: undefined,
            selectedTab: 2
        }
        this.tabLayouts = {};
    }

    onTabPress = (route, index) => {
        if (this._isSelected(route)) {
            this.props.navigation.emit({
                type: "tabPress",
                canPreventDefault: true
            });
        } else {
            this._updateBar(index);
            this.setState({
                selectedTab: index
            });
            this.props.navigation.navigate(route);
        }
    };

    _onTabLayout = (event, index) => {
        this.tabLayouts[index] = {
            x: event.nativeEvent.layout.x,
            width: event.nativeEvent.layout.width
        };
        this._updateBar(this.state.selectedTab);
    }; 

    _animatedBarEnabled = () =>
        Boolean(
            this.props.hasAnimation &&
                this.state.animatedBarWidth !== undefined &&
                this.state.animatedBarOffset !== undefined
        );

    _isSelected = id => {
        return this.props.state.routeNames[this.props.state.index] === id;
    };

    _updateBar = index => {
        const tabLayout = this.tabLayouts[index];

        if (tabLayout) {
            this.setState({ animatedBarOffset: tabLayout.x, animatedBarWidth: tabLayout.width });
        } else {
            this.setState({ animatedBarOffset: undefined, animatedBarWidth: undefined });
        }
    };

    _style = () => {
        return [styles.tabs, this.props.style];
    };

    render() {
        return (
            <SafeAreaView style={this._style()}>
                {this._animatedBarEnabled() ? (
                    <BarAnimated
                        style={styles.barAnimated}
                        offset={this.state.animatedBarOffset}
                        width={this.state.animatedBarWidth}
                    />
                ) : null}
                {this.props.tabs.map((tab, index) =>
                    !tab.hidden ? (
                        <View
                            style={styles.buttonTab}
                            key={tab.id}
                            onLayout={event => this._onTabLayout(event, index)}
                        >
                            <ButtonTab
                                text={tab.text}
                                color={tab.color}
                                colorSelected={tab.colorSelected}
                                disabled={tab.disabled}
                                fill={tab.fill}
                                fillSelected={tab.fillSelected}
                                badgeAnimationDuration={tab.badgeAnimationDuration}
                                badgeBackgroundColor={tab.badgeBackgroundColor}
                                badgeColor={tab.bundefinedadgeColor}
                                badgeCount={tab.badgeCount}
                                badgeCountThreshold={tab.badgeCountThreshold}
                                badgeHasAnimation={tab.badgeHasAnimation}
                                icon={tab.icon}
                                iconSelected={tab.iconSelected}
                                iconStrokeWidth={tab.iconStrokeWidth}
                                iconSelectedStrokeWidth={tab.iconSelectedStrokeWidth}
                                {...tab.props}
                                onPress={() => this.onTabPress(tab.id, index)}
                                selected={this._isSelected(tab.id)}
                            />
                        </View>
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
    },
    barAnimated: {
        position: "absolute",
        top: -1,
        height: 1
    },
    buttonTab: {
        flex: 1
    }
});

export default Tabs;
