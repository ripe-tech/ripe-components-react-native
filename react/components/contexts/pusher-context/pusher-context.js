import React, { Component } from "react";
import Pusher from "pusher-js/react-native";
import PropTypes from "prop-types";

export const PusherContext = React.createContext();

export class PusherProvider extends Component {
    static get propTypes() {
        return {
            errorHandler: PropTypes.func.isRequired,
            environment: PropTypes.string.isRequired
        };
    }

    constructor(props) {
        super(props);

        const options = this.getPusherOptions();
        if (!options) return;

        Pusher.logToConsole = options.logToConsole;
        this.pusher = new Pusher(options.appKey, options.options);
        this.pusher.connection.bind("error", err => this.props.errorHandler(err));

        this.state = {
            pusher: this.pusher
        };
    }

    getPusherOptions() {
        switch (this.props.environment) {
            case "production":
            case "beta":
                return {
                    appKey: "1aca2958aca8ee02a2ae",
                    options: { cluster: "eu" }
                };

            default:
                return {
                    appKey: "456c1a9d4a9b06b58063",
                    logToConsole: true,
                    options: { cluster: "eu", activityTimeout: 6000 }
                };
        }
    }

    render() {
        return (
            <PusherContext.Provider value={{ pusher: this.state.pusher }}>
                {this.props.children}
            </PusherContext.Provider>
        );
    }
}
