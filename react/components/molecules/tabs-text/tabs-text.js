import React, { PureComponent } from "react";
import { Dimensions, ScrollView, StyleSheet, View, ViewPropTypes } from "react-native";
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
            parentWidth: PropTypes.number,
            barAnimatedCoeficient: PropTypes.number,
            onTabChange: PropTypes.func.isRequired,
            onSelectedTabPress: PropTypes.func,
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
            parentWidth: undefined,
            barAnimatedCoeficient: undefined,
            onSelectedTabPress: () => {},
            style: {}
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            tabs: props.tabs,
            tabSelected: props.tabSelected,
            scrollTabPress: false,
            animatedBarWidth: undefined,
            animatedBarOffset: undefined,
            animatedBarOffsetScroll: undefined
        };
        this.tabLayouts = {};
        this.scroll = 0;
        this.scrollRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tabSelected !== this.props.tabSelected) {
            this.onTabPress(this.props.tabSelected);
        }

        if (
            prevProps.barAnimatedCoeficient !== this.props.barAnimatedCoeficient &&
            Math.abs(this.props.barAnimatedCoeficient) < 0.5 &&
            !this.state.scrollTabPress
        ) {
            console.log("antes", this.state.animatedBarWidth);
            const animatedBarOffset =
                this.props.barAnimatedCoeficient !== 0
                    ? this.state.animatedBarWidth * this.props.barAnimatedCoeficient +
                      this.state.animatedBarOffset
                    : 0;

            console.log("depois", animatedBarOffset);
            this.setState(
                {
                    animatedBarOffsetScroll: Math.round(animatedBarOffset)
                },
                () => {
                    console.log("bar ficou a: ", this.state.animatedBarOffsetScroll);
                }
            );
        }
    }

    onTabPress = tabSelectedIndex => {
        if (this.state.tabSelected === tabSelectedIndex) {
            this.props.onSelectedTabPress();
            return;
        }
        this.setState(
            {
                tabSelected: tabSelectedIndex,
                scrollTabPress: true,
                animatedBarOffsetScroll: undefined
            },
            () => {
                this._updateBar();
                this.props.onTabChange(this.state.tabSelected);
            }
        );
        this._scrollTo(tabSelectedIndex);
    };

    onScroll = event => {
        const scroll = event.nativeEvent.contentOffset.x;
        this.scroll = scroll;
    };

    _updateBar = () => {
        const index = this.state.tabSelected;
        const tabLayout = this.tabLayouts[index];

        if (tabLayout) {
            this.setState({
                animatedBarOffset: tabLayout.x,
                animatedBarWidth: tabLayout.width,
                scrollTabPress: false
            });
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
        this._updateBar();
    };

    _scrollTo(index) {
        const deviceWidth = this.props.parentWidth || Dimensions.get("window").width;
        const tabLayout = this.tabLayouts[index];
        const overflowRight = tabLayout.x + tabLayout.width > deviceWidth;
        const overflowLeft = this.scroll > tabLayout.x;
        const tabOverflows = overflowRight || overflowLeft;

        if (tabOverflows) {
            const scroll = overflowRight ? tabLayout.x + tabLayout.width : tabLayout.x;
            this.scrollRef.current.scrollTo({ x: scroll });
        }
    }

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

    render() {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={this._style()}
                horizontal={true}
                alwaysBounceHorizontal={false}
                showsHorizontalScrollIndicator={false}
                onScroll={this.onScroll}
                ref={this.scrollRef}
            >
                {this._renderTabs()}
                {this._animatedBarEnabled() ? (
                    <BarAnimated
                        offset={this.state.animatedBarOffsetScroll || this.state.animatedBarOffset}
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
