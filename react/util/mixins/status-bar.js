import { Platform, StatusBar } from "react-native";

/**
 * Mixin that adds functionality related with a screen a mobile application.
 *
 * @param {Class} superclass Parent class to be encapsulated with
 * this mixin.
 * @returns {Class} The new class with the added screen functionality.
 */
export const StatusBarMixin = superclass =>
    class extends superclass {
        initStatusBar() {
            this.props.navigation?.addListener("focus", this.onNavigationFocus.bind(this));
            this.setStatusBar();
        }

        destroyStatusBar() {
            this.props.navigation?.removeListener("focus", this.onNavigationFocus);
        }

        /**
         * Sets the status bar color in Android platforms.
         */
        setStatusBar() {
            if (Platform.OS === "android" && this.props.statusBarColor) {
                StatusBar.setBackgroundColor(this.props.statusBarColor);
            }
        }

        onNavigationFocus() {
            this.setStatusBar();
        }
    };
