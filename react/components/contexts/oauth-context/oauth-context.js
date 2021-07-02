import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import * as Sentry from "@sentry/react-native";
import PropTypes from "prop-types";
import { toTokensM } from "yonius";
import { API as RipeIdAPI } from "ripe-id-api";

import { RipeContext } from "../ripe-context";

export const OAuthContext = React.createContext();

export class OAuthProvider extends Component {
    static contextType = RipeContext;

    static get propTypes() {
        return {
            options: PropTypes.shape({
                clientId: PropTypes.string.isRequired,
                clientSecret: PropTypes.string.isRequired,
                redirectUrl: PropTypes.func.isRequired
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

    async trySetAccount() {
        const token = await AsyncStorage.getItem("token");
        const account = await AsyncStorage.getItem("account");
        const acl = await AsyncStorage.getItem("acl");
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        if (!token) return false;

        // restores the access and refresh tokens in the RIPE ID API
        // client so that it can be used again
        this.ripeIdApi.accessToken = accessToken;
        this.ripeIdApi.refreshToken = refreshToken;

        // runs the remote authentication process on the
        // RIPE Core (using the access token)
        await this.context.ripeApi.authPidP(token);

        // updates the OAuth context state according to the
        // newly found information (account, ACL, tokens, etc)
        this.setState(
            {
                account: account ? JSON.parse(account) : null,
                acl: acl ? JSON.parse(acl) : null,
                tokens: acl ? toTokensM(JSON.parse(acl)) : null
            },
            () => {
                Sentry.setUser({ id: this.state.account.id, email: this.state.account.email });
            }
        );
        return true;
    }

    async login(code) {
        const accessToken = await this.ripeIdApi.oauthAccess(code);
        const result = await this.ripeIdApi.issueToken();
        const account = await this.ripeIdApi.selfAccount();
        const acl = await this.ripeIdApi.aclAccount();
        const refreshToken = this.ripeIdApi.refreshToken;
        await AsyncStorage.setItem("token", result.token);
        await AsyncStorage.setItem("account", JSON.stringify(account));
        await AsyncStorage.setItem("acl", JSON.stringify(acl.tokens));
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        await this.trySetAccount();
    }

    async logout(message = null) {
        // re-creates the RIPE ID API instance and invalidates the
        // current RIPE SDK instance as it's no longer going to be used
        this.ripeIdApi = new RipeIdAPI(this.getRipeIdOptions());
        this.context.ripeApi.unauth();

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
        await this.trySetAccount();
        this.setState({ loaded: true });
    }

    render() {
        return (
            <OAuthContext.Provider
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
            </OAuthContext.Provider>
        );
    }
}
