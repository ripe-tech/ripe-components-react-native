import React, { Component } from "react";
import Pusher from "pusher-js/react-native";
import PropTypes from "prop-types";

export const PusherContext = React.createContext();

export class PusherProvider extends Component {
    static get propTypes() {
        return {
            errorHandler: PropTypes.func.isRequired,
            options: PropTypes.shape({
                appKey: PropTypes.string.isRequired,
                options: PropTypes.object
            })
        };
    }

    constructor(props) {
        super(props);

        if (!this.props.options) return;

        Pusher.logToConsole = this.props.options.logToConsole;
        this.pusher = new Pusher(this.props.options.appKey, this.props.options.options);
        this.pusher.connection.bind("error", err => this.props.errorHandler(err));

        this.state = {
            pusher: this.pusher
        };
    }

    render() {
        return (
            <PusherContext.Provider value={{ pusher: this.state.pusher }}>
                {this.props.children}
            </PusherContext.Provider>
        );
    }
}
