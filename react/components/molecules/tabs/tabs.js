import React, { PureComponent } from "react";
import { Keyboard, StyleSheet, View, ViewPropTypes } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import PropTypes from "prop-types";

import { BarAnimated, ButtonTab } from "../../atoms";

export class Tabs extends PureComponent {
    static get propTypes() {
        return {
            state: PropTypes.object.isRequired,
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
                    iconProps: PropTypes.object,
                    hidden: PropTypes.bool,
                    props: PropTypes.object,
                    badgeAnimationDuration: PropTypes.number,
                    badgeBackgroundColor: PropTypes.string,
                    badgeColor: PropTypes.string,
                    badgeCount: PropTypes.number,
                    badgeCountThreshold: PropTypes.number,
                    badgeHasAnimation: PropTypes.bool,
                    badgeText: PropTypes.string
                })
            ),
            selectedTab: PropTypes.number,
            hasAnimation: PropTypes.bool,
            hideOnKeyboard: PropTypes.bool,
            style: ViewPropTypes.style,
            barAnimatedStyle: PropTypes.object,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            tabs: [],
            selectedTab: undefined,
            hasAnimation: true,
            hideOnKeyboard: true,
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);
        const currentTab = this.props.state.index;
        this.state = {
            animatedBarWidth: undefined,
            animatedBarOffset: undefined,
            keyboardVisibility: false,
            selectedTab: props.selectedTab === undefined ? currentTab : props.selectedTab
        };
        this.tabLayouts = {};
        this.onKeyboardDidShow = Keyboard.addListener("keyboardDidShow", () =>
            this._updateKeyboardVisibility(true)
        );
        this.onKeyboardDidHide = Keyboard.addListener("keyboardDidHide", () =>
            this._updateKeyboardVisibility(false)
        );
    }

    componentWillUnmount() {
        this.onKeyboardDidHide.remove();
        this.onKeyboardDidShow.remove();
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

    _isHidden = () => {
        return this.props.hideOnKeyboard && this.state.keyboardVisibility;
    };

    _updateKeyboardVisibility(value) {
        this.setState({ keyboardVisibility: value });
    }

    _updateBar = index => {
        const tabLayout = this.tabLayouts[index];

        if (tabLayout) {
            this.setState({ animatedBarOffset: tabLayout.x, animatedBarWidth: tabLayout.width });
        } else {
            this.setState({ animatedBarOffset: undefined, animatedBarWidth: undefined });
        }
    };

    _style = () => {
        return [styles.tabs, this.props.style, this._isHidden() ? { display: "none" } : {}];
    };

    _barAnimatedStyle = () => {
        return [styles.barAnimated, this.props.barAnimatedStyle];
    };

    render() {
        return (
            <SafeAreaView style={this._style()}>
                {this._animatedBarEnabled() ? (
                    <BarAnimated
                        style={this._barAnimatedStyle()}
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
                                badgeColor={tab.badgeColor}
                                badgeCount={tab.badgeCount}
                                badgeCountThreshold={tab.badgeCountThreshold}
                                badgeHasAnimation={tab.badgeHasAnimation}
                                badgeText={tab.badgeText}
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
