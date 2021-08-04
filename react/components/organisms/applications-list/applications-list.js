import React, { Component } from "react";
import { FlatList, Linking, Platform, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { API, mix } from "yonius";
import { encode } from "js-base64";

import { IdentifiableMixin } from "../../../util";

import { Card } from "../../molecules";

import icons from "./assets";

export class ApplicationsList extends mix(Component).with(IdentifiableMixin) {
    static get propTypes() {
        return {
            applicationName: PropTypes.string.isRequired,
            configOptions: PropTypes.shape({
                url: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired,
                password: PropTypes.string.isRequired
            }).isRequired
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            applications: null,
            loading: false
        };
    }

    async componentDidMount() {
        await this.refresh();
    }

    async refresh() {
        this.setState({ loading: true }, async () => {
            try {
                const applications = await this._getApplications();
                this.setState({
                    applications: applications
                });
            } finally {
                this.setState({ loading: false });
            }
        });
    }

    async _getApplications() {
        const applications = await this._getPublicConfig("applications");
        return applications;
    }

    async _getPublicConfig(path) {
        const { url, username, password } = this.props.configOptions;
        const api = new API();
        const response = await api.get(`${url}${path}.json`, {
            headers: {
                Authorization: "Basic " + encode(`${username}:${password}`)
            }
        });
        return response;
    }

    async _openLink(url) {
        const supported = await Linking.canOpenURL(url);
        if (!supported) return false;

        await Linking.openURL(url);
        return true;
    }

    _applicationsFormated = () => {
        if (!this.state.applications) return;

        return Object.entries(this.state.applications)
            .map(([key, value]) => ({
                id: key,
                icon: icons[key],
                ...value
            }))
            .filter(a => a.type === "mobile" && a.id !== this.props.applicationName);
    };

    onCardPress = async item => {
        if (item.android || item.ios) {
            const hasApp = await this._openLink(`ripe-${item.id}://app`);
            if (hasApp) return;

            if (Platform.OS === "android") {
                await this._openLink(item.android);
            } else {
                await this._openLink(item.ios);
            }
        } else if (item.website) {
            await this._openLink(item.website);
        }
    };

    _renderCardApplication = item => {
        return (
            <Card
                style={styles.card}
                icon={item.icon}
                iconStrokeWidth={0}
                title={item.name}
                text={item.description}
                key={item.id}
                onPress={() => this.onCardPress(item)}
            />
        );
    };

    _renderEmptyList = () => {
        return (
            <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>No applications</Text>
            </View>
        );
    };

    render() {
        return (
            <FlatList
                key={"applications"}
                style={styles.applicationsList}
                data={this._applicationsFormated()}
                renderItem={({ item }) => this._renderCardApplication(item)}
                refreshing={this.state.loading}
                onRefresh={async () => await this.refresh()}
                keyExtractor={item => String(item.id)}
                ListEmptyComponent={this._renderEmptyList()}
                ListFooterComponent={<View style={styles.flatListBottom} />}
                {...this.id("applications")}
            />
        );
    }
}

const styles = StyleSheet.create({
    applicationsList: {
        height: "100%"
    },
    card: {
        marginBottom: 15,
        paddingHorizontal: 15,
        height: 94
    },
    emptyList: {
        alignItems: "center",
        paddingVertical: 10
    },
    emptyListText: {
        marginTop: 20,
        color: "#a4adb5",
        fontSize: 25
    }
});
