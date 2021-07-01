import React, { Component } from "react";
import PropTypes from "prop-types";
import { RipeAPI } from "ripe-sdk";

export const RipeContext = React.createContext();

export class RipeProvider extends Component {
    static get propTypes() {
        return {
            environment: PropTypes.string.isRequired
        };
    }

    constructor(props) {
        super(props);

        this.state = { ripeApi: null };
    }

    async componentDidMount() {
        const ripeApi = new RipeAPI(this.getRipeOptions());
        await ripeApi.isReady();

        this.setState({ ripeApi: ripeApi });
    }

    getRipeOptions() {
        switch (this.props.environment) {
            case "production":
            case "beta":
                return {
                    url: "https://app.platforme.com/api/",
                    noBundles: false
                };

            default:
                return {
                    url: "https://sandbox.platforme.com/api/",
                    noBundles: false
                };
        }
    }

    render() {
        return (
            <RipeContext.Provider value={{ ripeApi: this.state.ripeApi }}>
                {this.props.children}
            </RipeContext.Provider>
        );
    }
}
