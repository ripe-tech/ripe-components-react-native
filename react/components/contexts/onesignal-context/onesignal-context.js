import React, { Component } from "react";
import OneSignal from "react-native-onesignal";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import { verify } from "yonius";

import { RipeContext } from "../ripe-context";

export const OneSignalContext = React.createContext();
export const NavigationRef = React.createRef();

export class OneSignalProvider extends Component {
    static contextType = RipeContext;

    static get propTypes() {
        return {
            errorHandler: PropTypes.func.isRequired,
            options: PropTypes.shape({
                appId: PropTypes.string.isRequired
            })
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            appId: null,
            deviceId: null,
            pushToken: null
        };
    }

    async componentDidMount() {
        try {
            await this.initOneSignal();
        } catch (err) {
            this.props.errorHandler(err);
        }
    }

    async initOneSignal() {
        this.setState({ appId: this.props.options.appId });

        // configure the app ID in the global One Signal instance
        // and then update the notification open handler to handle
        // actions (clicks) in push notification
        OneSignal.setAppId(this.props.options.appId);
        OneSignal.setNotificationOpenedHandler(event => {
            const data = event.notification.additionalData;
            if (data.params) NavigationRef.current.navigate("orderDetail", data.params);
        });

        // in case the current device is an iOS compatible one, then prompts the
        // uses for notification permissions making sure that the response is
        // positive, otherwise raises a verification exception
        if (Platform.OS === "ios") {
            const result = await new Promise(resolve =>
                OneSignal.promptForPushNotificationsWithUserResponse(response => resolve(response))
            );
            verify(result, "Not possible to obtain notification permissions");
        }

        // in case a proper device user ID is retrieve then it's registered
        // both under the current application state and also in the remote
        // data source for proper device to user association
        const deviceState = await OneSignal.getDeviceState();
        if (deviceState.userId) {
            this.setState({ deviceId: deviceState.userId, pushToken: deviceState.pushToken });
            await this.context.ripeApi.createDeviceIdP(deviceState.userId);
        }
    }

    render() {
        return (
            <OneSignalContext.Provider
                value={{
                    oneSignalAppId: this.state.appId,
                    oneSignalDeviceId: this.state.deviceId,
                    oneSignalPushToken: this.state.pushToken
                }}
            >
                {this.props.children}
            </OneSignalContext.Provider>
        );
    }
}