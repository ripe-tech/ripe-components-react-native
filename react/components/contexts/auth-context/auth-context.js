import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import PropTypes from "prop-types";
import { verify } from "yonius";
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
            tokens: null,
            ripeIdApi: this.ripeIdApi
        };
    }

    async trySetAccount() {
        const sid = await AsyncStorage.getItem("sessionId");
        const account = await AsyncStorage.getItem("account");
        const tokens = await AsyncStorage.getItem("tokens");

        if (!sid || !account || !tokens) return false;

        this.ripeIdApi.sessionId = sid;
        this.setState({
            account: account ? JSON.parse(account) : null,
            tokens: tokens ? JSON.parse(tokens) : null
        });
        return true;
    }

    async login(email, password) {
        const response = await this.ripeIdApi.login(email, password);
        verify(response.sid, "No session ID found", 404);
        verify(response.tokens, "No tokens list found", 404);

        this.ripeIdApi.sessionId = response.sid;

        const account = await this.ripeIdApi.selfAccount();
        verify(account, "No account found", 404);

        await AsyncStorage.setItem("sessionId", response.sid);
        await AsyncStorage.setItem("account", JSON.stringify(account));
        await AsyncStorage.setItem("tokens", JSON.stringify(response.tokens));
        await this.trySetAccount();
    }

    async logout(message = null) {
        // re-creates the RIPE ID API instance
        this.ripeIdApi = new RipeIdAPI(this.props.options);

        // updates the current state, removing the complete set of
        // account related information (as expected)
        this.setState({
            account: null,
            tokens: null,
            logoutMessage: message
        });

        await AsyncStorage.removeItem("sessionId");
        await AsyncStorage.removeItem("account");
        await AsyncStorage.removeItem("tokens");
    }

    async componentDidMount() {
        await this.trySetAccount();
        this.setState({ loaded: true });
    }

    render() {
        return (
            <AuthContext.Provider
                value={{
                    loaded: this.state.loaded,
                    logoutMessage: this.state.logoutMessage,
                    account: this.state.account,
                    tokens: this.state.tokens,
                    ripeIdApi: this.state.ripeIdApi,
                    ripeApi: this.context.ripeApi,
                    logout: async message => await this.logout(message),
                    login: async (email, password) => await this.login(email, password)
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}