import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import PropTypes from "prop-types";

import { ButtonTab } from "../../atoms/button-tab";

export class Tabs extends PureComponent {
    static get propTypes() {
        return {
            navigation: PropTypes.object.isRequired,
            tabs: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    icon: PropTypes.string.isRequired,
                    selected: PropTypes.bool,
                    disabled: PropTypes.bool
                })
            )
        };
    }

    static get defaultProps() {
        return {
            tabs: []
        };
    }

    onPressTab = (tag, index) => {
        this.props.navigation.navigate(tag, index);
    };

    _isSelected = index => {
        const {
            navigation: {
                state: { index: selected }
            }
        } = this.props;
        return selected === index;
    };

    render() {
        const { tabs } = this.props;
        return (
            <SafeAreaView style={styles.root}>
                {tabs.map((tab, index) => (
                    <ButtonTab
                        width={`${100 / tabs.length}%`}
                        key={tab.text}
                        text={tab.text}
                        disabled={tab.disabled}
                        icon={tab.icon}
                        onPress={() => this.onPressTab(tab, index)}
                        selected={this._isSelected(index)}
                    />
                ))}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        flexDirection: "row"
    }
});
