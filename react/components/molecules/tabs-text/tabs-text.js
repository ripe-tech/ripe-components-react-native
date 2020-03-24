import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
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
            tabSelected: 0,
            variant: undefined,
            style: {}
        };
    }

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

    _style() {
        return [
            styles.tabsText,
            styles[`tabsText${capitalize(this.props.variant)}`],
            this.props.style
        ];
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
                    variant={this.props.variant}
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
    tabsTextCompact: {
        borderBottomWidth: 0
    },
    button: {
        flex: 1
    },
    barAnimated: {
        position: "absolute",
        bottom: 0
    }
});
