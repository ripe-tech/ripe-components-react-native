import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import * as Sentry from "@sentry/react-native";
import PropTypes from "prop-types";
import { toTokensM } from "yonius";
import { API as RipeIdAPI } from "ripe-id-api";

import { RipeContext } from "../ripe-context";

export const AuthContext = React.createContext();

export class AuthProvider extends Component {
    static contextType = RipeContext;

    static get propTypes() {
        return {
            options: PropTypes.shape({
                clientId: PropTypes.string.isRequired,
                clientSecret: PropTypes.string.isRequired,
                redirectUrl: PropTypes.string.isRequired
            })
        };
    }

    constructor(props) {
        super(props);

        this.ripeIdApi = new RipeIdAPI(this.props.options);
        this.state = {
            loaded: false,
            logoutMessage: null,
            account: null,
            acl: null,
            tokens: null,
            ripeIdApi: this.ripeIdApi
        };

        // registers the access token callback function to be able
        // to update the internal async storage
        this.ripeIdApi.bind("access_token", async accessToken => {
            await AsyncStorage.setItem("accessToken", accessToken);
        });
    }

    async login(email, password) {
        console.log("AUTH CONTEXT LOGIN", email, password);
        const response = await this.ripeIdApi.login(email, password);
        console.log(response);
        return response
    }

    async logout(message = null) {
        // re-creates the RIPE ID API instance and invalidates the
        // current RIPE SDK instance as it's no longer going to be used
        this.ripeIdApi = new RipeIdAPI(this.props.options);
        if (this.context.ripeApi) this.context.ripeApi.unauth();

        // registers the access token callback function to be able
        // to update the internal async storage
        this.ripeIdApi.bind("access_token", async accessToken => {
            await AsyncStorage.setItem("accessToken", accessToken);
        });

        // updates the current state, removing the complete set of
        // account related information (as expected)
        this.setState({
            account: null,
            acl: null,
            tokens: null,
            logoutMessage: message
        });

        // removes the complete set of items from the local storage
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("account");
        await AsyncStorage.removeItem("acl");
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
    }

    async componentDidMount() {
        this.setState({ loaded: true });
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    loaded: this.state.loaded,
                    logoutMessage: this.state.logoutMessage,
                    account: this.state.account,
                    acl: this.state.acl,
                    tokens: this.state.tokens,
                    ripeIdApi: this.state.ripeIdApi,
                    ripeApi: this.context.ripeApi,
                    logout: message => this.logout(message),
                    login: code => this.login(code)
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
