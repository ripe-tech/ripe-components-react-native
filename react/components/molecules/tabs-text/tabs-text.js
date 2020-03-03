import React, { PureComponent } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import { ButtonTabText, BarAnimated } from "../../";
import PropTypes from "prop-types";

export class TabsText extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tabs: props.tabs,
            tabSelected: props.tabSelected
        };
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
        this.setState({ tabSelected: tabSelectedIndex });
        this.props.onTabChange(tabSelectedIndex);
    };

    _style() {
        return [styles.tabsText, this.props.style];
    }

    _renderTabs() {
        return this.props.tabs.map((tab, index) => (
            <ButtonTabText
                key={tab.text}
                text={tab.text}
                onPress={() => this.onTabPress(index)}
                active={this.state.tabSelected === index}
                disabled={tab.disabled}
                style={styles.button}
            />
        ));
    }

    render() {
        return (
            <View style={this._style()}>
                {this._renderTabs()}
                {this.props.hasAnimation ? (
                    <BarAnimated
                        numberOfItems={this.props.tabs.length}
                        activeItem={this.state.tabSelected}
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
        flexDirection: "row"
    },
    button: {
        flex: 1
    },
    barAnimated: {
        bottom: -1
    }
});
