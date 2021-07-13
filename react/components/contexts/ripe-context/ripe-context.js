import React, { Component } from "react";
import PropTypes from "prop-types";
import { RipeAPI } from "ripe-sdk";

export const RipeContext = React.createContext();

export class RipeProvider extends Component {
    static get propTypes() {
        return {
            options: PropTypes.object
        };
    }

    constructor(props) {
        super(props);

        this.state = { ripeApi: null };
    }

    async componentDidMount() {
        const ripeApi = new RipeAPI(this.props.options);
        await ripeApi.isReady();

        this.setState({ ripeApi: ripeApi });
    }

    render() {
        return (
            <RipeContext.Provider value={{ ripeApi: this.state.ripeApi }}>
                {this.props.children}
            </RipeContext.Provider>
        );
    }
}
