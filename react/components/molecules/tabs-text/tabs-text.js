import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View, ScrollView, Dimensions } from "react-native";
import PropTypes from "prop-types";

import { capitalize } from "../../../util";

import { ButtonTabText, BarAnimated } from "../../atoms";

export class TabsText extends PureComponent {
    static get propTypes() {
        return {
            hasAnimation: PropTypes.bool,
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    disabled: PropTypes.bool
                }).isRequired
            ).isRequired,
            tabsColor: PropTypes.string,
            tabSelected: PropTypes.number,
            variant: PropTypes.string,
            onTabChange: PropTypes.func.isRequired,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            hasAnimation: true,
            tabs: [],
            tabsColor: "#24425a",
            tabSelected: 0,
            variant: undefined,
            style: {}
        };
    }

    constructor(props) {
        super(props);
        this.scrollRef = React.createRef();

        this.state = {
            tabs: props.tabs,
            tabSelected: props.tabSelected,
            animatedBarWidth: undefined,
            animatedBarOffset: undefined
        };
        this.tabLayouts = {};
        this.XScroll = 0;
        this.overflows = false;
    }

    onTabPress = tabSelectedIndex => {
        this.setState({ tabSelected: tabSelectedIndex }, () => {
            this._updateBar();
            this.props.onTabChange(this.state.tabSelected);
        });
        const deviceWidth = Dimensions.get("window").width;
        const tabLayout = this.tabLayouts[tabSelectedIndex];
        const overFlowRight = tabLayout.x + tabLayout.width > deviceWidth;
        const overFlowLeft = this.XScroll > tabLayout.x;
        const tabOverflows = overFlowRight || overFlowLeft;

        if (tabOverflows) {
            const X = overFlowRight ? tabLayout.x + tabLayout.width : tabLayout.x;
            this.scrollRef.current.scrollTo({ x: X });
        }
    };

    onScroll = event => {
        const XScroll = event.nativeEvent.contentOffset.x;
        this.XScroll = XScroll;
    };

    _setOverflow = () => {
        const tabsTextWidth = Object.values(this.tabLayouts)
            .map(value => value.width)
            .reduce(this._sum);
        this.overflows = tabsTextWidth > Dimensions.get("window").width;
    };

    _updateBar = () => {
        const index = this.state.tabSelected;
        const tabLayout = this.tabLayouts[index];

        if (tabLayout) {
            this.setState({ animatedBarOffset: tabLayout.x, animatedBarWidth: tabLayout.width });
        } else {
            this.setState({ animatedBarOffset: undefined, animatedBarWidth: undefined });
        }
    };

    _animatedBarEnabled = () =>
        Boolean(
            this.props.hasAnimation &&
                this.state.animatedBarWidth !== undefined &&
                this.state.animatedBarOffset !== undefined &&
                this.props.variant === undefined
        );

    _onTabLayout = (event, index) => {
        this.tabLayouts[index] = {
            x: event.nativeEvent.layout.x,
            width: event.nativeEvent.layout.width
        };
        if (index === this.props.tabs.length - 1) this.setOverflow();
        this._updateBar();
    };

    _style() {
        return [
            styles.tabsText,
            styles[`tabsText${capitalize(this.props.variant)}`],
            this.props.style
        ];
    }

    _buttonStyle = () => {
        return [styles.button, styles[`button${capitalize(this.props.variant)}`]];
    };

    _renderTabs() {
        return this.props.tabs.map((tab, index) => (
            <View
                style={this._buttonStyle()}
                key={tab.text}
                onLayout={event => this._onTabLayout(event, index)}
            >
                <ButtonTabText
                    text={tab.text}
                    color={this.props.tabsColor}
                    onPress={() => this.onTabPress(index)}
                    active={this.state.tabSelected === index}
                    disabled={tab.disabled}
                    variant={this.props.variant}
                />
            </View>
        ));
    }

    _sum = (previousValue, currentValue) => {
        return previousValue + currentValue;
    };

    render() {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={this._style()}
                horizontal={true}
                scrollEnabled={this.overflows}
                showsHorizontalScrollIndicator={false}
                onScroll={this.onScroll}
                ref={this.scrollRef}
            >
                {this._renderTabs()}
                {this._animatedBarEnabled() ? (
                    <BarAnimated
                        offset={this.state.animatedBarOffset}
                        width={this.state.animatedBarWidth}
                        style={styles.barAnimated}
                    />
                ) : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    tabsText: {
        borderBottomWidth: 1,
        borderColor: "#e4e8f0",
        maxHeight: 50
    },
    tabsTextCompact: {
        borderTopWidth: 1,
        backgroundColor: "#f6f7f9",
        textDecorationLine: "underline"
    },
    button: {
        flex: 1
    },
    buttonCompact: {
        flex: 0
    },
    barAnimated: {
        position: "absolute",
        bottom: 0
    }
});
