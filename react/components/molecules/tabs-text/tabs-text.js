import React, { PureComponent } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { capitalize } from "ripe-commons-native";

import { BarAnimated, ButtonTabText } from "../../atoms";

export class TabsText extends PureComponent {
    static get propTypes() {
        return {
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    disabled: PropTypes.bool
                }).isRequired
            ).isRequired,
            tabsColor: PropTypes.string,
            tabsColorSelected: PropTypes.string,
            tabsBackgroundColor: PropTypes.string,
            tabsBackgroundColorSelected: PropTypes.string,
            tabSelected: PropTypes.number,
            hasAnimation: PropTypes.bool,
            variant: PropTypes.string,
            parentWidth: PropTypes.number,
            onTabChange: PropTypes.func.isRequired,
            onSelectedTabPress: PropTypes.func,
            style: PropTypes.any,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            tabs: [],
            tabsColor: "#c8cdd2",
            tabsColorSelected: "#00435e",
            tabsBackgroundColor: "#f6f7f9",
            tabsBackgroundColorSelected: "#4f7af8",
            tabSelected: 0,
            hasAnimation: true,
            variant: undefined,
            parentWidth: undefined,
            onTabChange: () => {},
            onSelectedTabPress: () => {},
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            tabSelected: props.tabSelected,
            animatedBarWidth: undefined,
            animatedBarOffset: undefined
        };
        this.tabLayouts = {};
        this.scroll = 0;
        this.scrollRef = React.createRef();
    }

    onTabPress = tabSelectedIndex => {
        if (this.state.tabSelected === tabSelectedIndex) {
            this.props.onSelectedTabPress();
            return;
        }
        this.setState({ tabSelected: tabSelectedIndex }, () => {
            if (this.props.hasAnimation) this._updateBar();
            this.props.onTabChange(this.state.tabSelected);
        });

        // scrolls to the beginning or end of the tabs taking
        // into account the selected tab, so that it is always
        // showing the tabs next to the one selected
        let scrollIndex = tabSelectedIndex;
        if (tabSelectedIndex < this.props.tabs.length / 2) scrollIndex = 0;
        if (tabSelectedIndex > this.props.tabs.length / 2) {
            scrollIndex = this.props.tabs.length - 1;
        }
        this._scrollTo(scrollIndex);
    };

    onScroll = event => {
        const scroll = event.nativeEvent.contentOffset.x;
        this.scroll = scroll;
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

    _onTabLayout = (event, index) => {
        this.tabLayouts[index] = {
            x: event.nativeEvent.layout.x,
            width: event.nativeEvent.layout.width
        };
        if (this.props.hasAnimation) this._updateBar();
    };

    _animatedBarEnabled = () =>
        Boolean(
            this.props.hasAnimation &&
                this.state.animatedBarWidth !== undefined &&
                this.state.animatedBarOffset !== undefined &&
                this.props.variant === undefined
        );

    _scrollTo = index => {
        const deviceWidth = this.props.parentWidth || Dimensions.get("window").width;
        const tabLayout = this.tabLayouts[index];
        const overflowRight = tabLayout.x + tabLayout.width > deviceWidth;
        const overflowLeft = this.scroll > tabLayout.x;
        const tabOverflows = overflowRight || overflowLeft;

        if (tabOverflows) {
            const scroll = overflowRight ? tabLayout.x + tabLayout.width : tabLayout.x;
            this.scrollRef.current.scrollTo({ x: scroll });
        }
    };

    _style = () => {
        return [
            styles.tabsText,
            styles[`tabsText${capitalize(this.props.variant)}`],
            this.props.style
        ];
    };

    _buttonContainerStyle = () => {
        return [styles.buttonContainer, styles[`buttonContainer${capitalize(this.props.variant)}`]];
    };

    _buttonTabStyle(index) {
        return [
            index === 0
                ? {
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6
                  }
                : {},
            index === this.props.tabs.length - 1
                ? {
                      borderTopRightRadius: 6,
                      borderBottomRightRadius: 6
                  }
                : {}
        ];
    }

    _buttonStyle = index => {
        return [
            styles.button,
            styles[`button${capitalize(this.props.variant)}`],
            ...(this.props.variant === "colored" ? this._coloredVariantStyle(index) : [])
        ];
    };

    _coloredVariantStyle = index => {
        return [
            styles.buttonColored,
            index === 0 ? styles.buttonColoredLeft : {},
            index === this.props.tabs.length - 1 ? styles.buttonColoredRight : {},
            this.state.tabSelected === index
                ? {
                      borderTopColor: this.props.tabsBackgroundColorSelected,
                      borderRightColor: this.props.tabsBackgroundColorSelected,
                      borderBottomColor: this.props.tabsBackgroundColorSelected,
                      borderLeftColor: this.props.tabsBackgroundColorSelected
                  }
                : {},
            // workaround for android border problem that does not
            // allow override of specific border color when a global
            // one is applied
            this.state.tabSelected === index - 1
                ? {
                      borderLeftColor: "transparent",
                      borderLeftWidth: 1
                  }
                : {}
        ];
    };

    _renderTabs() {
        return this.props.tabs.map((tab, index) => (
            <View
                style={this._buttonContainerStyle()}
                key={`${tab.text}-${index}`}
                onLayout={event => this._onTabLayout(event, index)}
            >
                <ButtonTabText
                    style={this._buttonTabStyle(index)}
                    buttonStyle={this._buttonStyle(index)}
                    text={tab.text}
                    color={this.props.tabsColor}
                    colorSelected={this.props.tabsColorSelected}
                    backgroundColor={this.props.tabsBackgroundColor}
                    backgroundColorSelected={this.props.tabsBackgroundColorSelected}
                    variant={this.props.variant}
                    onPress={() => this.onTabPress(index)}
                    active={this.state.tabSelected === index}
                    disabled={tab.disabled}
                />
            </View>
        ));
    }

    render() {
        return (
            <ScrollView
                ref={this.scrollRef}
                style={this._style()}
                contentContainerStyle={{ flexGrow: 1 }}
                horizontal={true}
                bounces={false}
                alwaysBounceHorizontal={false}
                showsHorizontalScrollIndicator={false}
                onScroll={this.onScroll}
                scrollEventThrottle={4}
            >
                {this._renderTabs()}
                {this._animatedBarEnabled() ? (
                    <BarAnimated
                        style={styles.barAnimated}
                        offset={this.state.animatedBarOffset}
                        width={this.state.animatedBarWidth}
                    />
                ) : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    tabsText: {
        maxHeight: 50
    },
    tabsTextCompact: {
        borderTopWidth: 1,
        backgroundColor: "#f6f7f9",
        textDecorationLine: "underline"
    },
    buttonContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#e4e8f0"
    },
    buttonContainerCompact: {
        flex: 0,
        borderBottomWidth: 0
    },
    buttonContainerColored: {
        flex: 1,
        height: 36,
        borderBottomWidth: 0
    },
    button: {
        flex: 1
    },
    buttonCompact: {
        flex: 1
    },
    buttonColored: {
        borderWidth: 1,
        borderRightWidth: 0,
        borderStyle: "solid",
        borderTopColor: "#e4e8f0",
        borderRightColor: "#e4e8f0",
        borderBottomColor: "#e4e8f0",
        borderLeftColor: "#e4e8f0"
    },
    buttonColoredLeft: {
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
    },
    buttonColoredRight: {
        borderRightWidth: 1,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    },
    barAnimated: {
        position: "absolute",
        bottom: 0,
        height: 1
    }
});
