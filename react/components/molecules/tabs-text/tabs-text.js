import React, { PureComponent } from "react";
import { Dimensions, ScrollView, StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

import { ButtonTabText } from "../../atoms";

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
            variant: PropTypes.string,
            parentWidth: PropTypes.number,
            onTabChange: PropTypes.func.isRequired,
            onSelectedTabPress: PropTypes.func,
            style: ViewPropTypes.style,
            styles: PropTypes.any
        };
    }

    static get defaultProps() {
        return {
            tabs: [],
            tabsColor: "#4f7af8",
            tabsColorSelected: "#ffffff",
            tabsBackgroundColor: "#ffffff",
            tabsBackgroundColorSelected: "#4f7af8",
            tabSelected: 0,
            variant: undefined,
            parentWidth: undefined,
            onSelectedTabPress: () => {},
            style: {},
            styles: styles
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            tabs: props.tabs,
            tabSelected: props.tabSelected
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
            this.props.onTabChange(this.state.tabSelected);
        });
        this._scrollTo(tabSelectedIndex);
    };

    onScroll = event => {
        const scroll = event.nativeEvent.contentOffset.x;
        this.scroll = scroll;
    };

    _onTabLayout = (event, index) => {
        this.tabLayouts[index] = {
            x: event.nativeEvent.layout.x,
            width: event.nativeEvent.layout.width
        };
    };

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

    _buttonStyle = index => {
        return [
            styles.button,
            index === 0 ? styles.buttonLeft : {},
            index === this.props.tabs.length - 1 ? styles.buttonRight : {},
            this.state.tabSelected === index ? { borderColor: "transparent" } : {}
        ];
    };

    _renderTabs() {
        return this.props.tabs.map((tab, index) => (
            <View
                style={styles.buttonContainer}
                key={`${tab.text}-${index}`}
                onLayout={event => this._onTabLayout(event, index)}
            >
                <ButtonTabText
                    style={this._buttonStyle(index)}
                    text={tab.text}
                    color={this.props.tabsColor}
                    colorSelected={this.props.tabsColorSelected}
                    backgroundColor={this.props.tabsBackgroundColor}
                    backgroundColorSelected={this.props.tabsBackgroundColorSelected}
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
                style={this.props.style}
                contentContainerStyle={{ flexGrow: 1 }}
                horizontal={true}
                bounces={false}
                alwaysBounceHorizontal={false}
                showsHorizontalScrollIndicator={false}
                onScroll={this.onScroll}
            >
                {this._renderTabs()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        height: 36
    },
    button: {
        borderWidth: 1,
        borderRightWidth: 0,
        borderStyle: "solid",
        borderColor: "#e4e8f0"
    },
    buttonLeft: {
        borderRightWidth: 0,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
    },
    buttonRight: {
        borderRightWidth: 1,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    }
});
