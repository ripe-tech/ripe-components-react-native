import React, { Component } from "react";
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

    async login(email, password) {
        const response = await this.ripeIdApi.login(email, password);
        verify(response.sid, "No session ID found", 404);
        verify(response.username, "No username found", 404);
        verify(response.tokens, "No tokens list found", 404);

        this.ripeIdApi.sessionId = response.sid;
        this.setState({
            account: response.username,
            tokens: response.tokens
        });
    }

    logout(message = null) {
        // re-creates the RIPE ID API instance and invalidates the
        // current RIPE SDK instance as it's no longer going to be used
        this.ripeIdApi = new RipeIdAPI(this.props.options);
        if (this.context.ripeApi) this.context.ripeApi.unauth();

        // updates the current state, removing the complete set of
        // account related information (as expected)
        this.setState({
            account: null,
            tokens: null,
            logoutMessage: message
        });
    }

    componentDidMount() {
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
                    logout: message => this.logout(message),
                    login: async (email, password) => await this.login(email, password)
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
