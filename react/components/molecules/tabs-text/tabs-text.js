import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import { ButtonTabText, BarAnimated } from "../../atoms";

export class TabsText extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tabs: props.tabs,
            tabSelected: props.tabSelected,
            animatedBarWidth: undefined,
            animatedBarOffset: undefined
        };
        this.tabLayouts = {};
    }

    static get propTypes() {
        return {
            onTabChange: PropTypes.func.isRequired,
            hasAnimation: PropTypes.bool,
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    disabled: PropTypes.bool
                }).isRequired
            ).isRequired,
            tabSelected: PropTypes.number,
            style: ViewPropTypes.style
        };
    }

    static get defaultProps() {
        return {
            hasAnimation: true,
            tabs: [],
            tabSelected: 0,
            style: {}
        };
    }

    onTabPress = tabSelectedIndex => {
        this.setState({ tabSelected: tabSelectedIndex }, () => {
            this._updateBar();
            this.props.onTabChange(this.state.tabSelected);
        });
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
                this.state.animatedBarOffset !== undefined
        );

    _onTabLayout = (event, index) => {
        this.tabLayouts[index] = {
            x: event.nativeEvent.layout.x,
            width: event.nativeEvent.layout.width
        };
        this._updateBar();
    };

    _style() {
        return [styles.tabsText, this.props.style];
    }

    _renderTabs() {
        return this.props.tabs.map((tab, index) => (
            <View
                key={tab.text}
                onLayout={event => this._onTabLayout(event, index)}
                style={styles.button}
            >
                <ButtonTabText
                    text={tab.text}
                    onPress={() => this.onTabPress(index)}
                    active={this.state.tabSelected === index}
                    disabled={tab.disabled}
                />
            </View>
        ));
    }

    render() {
        return (
            <View style={this._style()}>
                {this._renderTabs()}
                {this._animatedBarEnabled() ? (
                    <BarAnimated
                        offset={this.state.animatedBarOffset}
                        width={this.state.animatedBarWidth}
                        style={styles.barAnimated}
                    />
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabsText: {
        borderBottomWidth: 1,
        borderBottomColor: "#e4e8f0",
        flexDirection: "row",
        position: "relative"
    },
    button: {
        flex: 1
    },
    barAnimated: {
        position: "absolute",
        bottom: 0
    }
});
