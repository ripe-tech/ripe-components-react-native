import { Platform, StatusBar } from "react-native";

/**
 * Mixin that adds functionality related with a screen a mobile application.
 *
 * @param {Class} superclass Parent class to be encapsulated with
 * this mixin.
 * @returns {Class} The new class with the added screen functionality.
 */
export const ScreenMixin = superclass =>
    class extends superclass {
        /**
         * Sets the status bar color in Android platforms.
         */
        setStatusBar() {
            if (Platform.OS === "android") {
                StatusBar.setBackgroundColor(this.props.statusBarColor || "#f5f7f9");
            }
        }
    };
