import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ButtonTab } from "../../atoms";
import PropTypes from "prop-types";

export class Tabs extends PureComponent {
    onPressTab = tag => {
        this.props.navigation.navigate(tag);
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
                        onPress={() => this.onPressTab(tab)}
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

Tabs.propTypes = {
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
