import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ButtonTab } from "../../atoms";
import PropTypes from "prop-types";

export class Tab extends PureComponent {
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
                {Object.keys(tabs).map((tab, index) => (
                    <ButtonTab
                        key={tab}
                        label={tabs[tab].label}
                        disabled={tabs[tab].disabled}
                        activeImage={tabs[tab].activeImage}
                        inactiveImage={tabs[tab].inactiveImage}
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
        backgroundColor: "white",
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "flex-end",
        borderTopWidth: 1,
        borderTopColor: "#e3e8f1",
        paddingTop: 2,
        paddingBottom: 2
    }
});

Tab.propTypes = {
    navigation: PropTypes.object.isRequired,
    tabs: PropTypes.object.isRequired
};
