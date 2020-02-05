import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ButtonTab } from "../../atoms";
import PropTypes from "prop-types";

export class Tab extends PureComponent {
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

Tab.propTypes = {
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

Tab.defaultProps = {
    tabs: []
};
