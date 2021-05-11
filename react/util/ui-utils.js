import {
    Alert,
    Dimensions,
    Linking,
    PermissionsAndroid,
    Platform,
    ToastAndroid
} from "react-native";
import DeviceInfo from "react-native-device-info";
import DocumentPicker from "react-native-document-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { getUriBasename } from "./utils";

/**
 * The width in pixels to be used as a comparison and
 * determine if the current device represents a mobile
 * phone "like" device.
 */
const MOBILE_WIDTH = 420;

/**
 * Normalizes the provided attachment object (coming from the
 * picker) so that they can be better used internally.
 *
 * @param {Object} attachment An attachment object that is going
 * to have all of its base component normalized.
 * @returns {Object} The normalized version of the attachment with
 * the URI, name, type and size fields, ready to be used internally
 * under the react native environment.
 */
const normalizeAttachment = function (attachment) {
    let uri = attachment.uri;

    // convert the URI so that it becomes compatible
    // with react-native internal logic, this logic is
    // conditional to the iOS platforme as that's the
    // only place where the URI must be decoded
    if (Platform.OS === "ios") uri = decodeURIComponent(uri);

    return {
        uri: uri,
        name: attachment.name || getUriBasename(uri),
        type: attachment.type,
        size: attachment.size
    };
};

export const pickDocuments = async function (options = {}) {
    try {
        const attachments = await DocumentPicker.pickMultiple(options);
        return attachments.map(attachment => normalizeAttachment(attachment));
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            return [];
        } else {
            throw err;
        }
    }
};

const normalizeImage = function (image) {
    return {
        uri: image.uri,
        name: image.fileName || getUriBasename(image.uri),
        type: image.type,
        size: image.fileSize,
        width: image.width,
        height: image.height
    };
};

export const pickImageCamera = async function (options = { mediaType: "photo" }) {
    const promise = new Promise((resolve, reject) => {
        launchCamera(options, response => {
            _handlePickImage(resolve, reject, response);
        });
    });

    const result = await promise;
    return result;
};

export const pickImageGalery = async function (options = { mediaType: "photo" }) {
    const promise = new Promise((resolve, reject) => {
        launchImageLibrary(options, response => {
            _handlePickImage(resolve, reject, response);
        });
    });

    const result = await promise;
    return result;
};

export const requestPermissionCamera = async () => {
    Platform.OS === "android"
        ? await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        : Linking.openURL("app-settings:");
};

export const notify = function (message) {
    Platform.OS === "android"
        ? ToastAndroid.show(message, ToastAndroid.SHORT)
        : Alert.alert(message);
};

export const isTabletSize = function () {
    return !isMobileSize();
};

export const isMobileSize = function () {
    const { height, width } = Dimensions.get("window");
    if (isLandscape()) return height <= MOBILE_WIDTH;
    return width <= MOBILE_WIDTH;
};

export const isLandscape = function () {
    const { height, width } = Dimensions.get("window");
    return width >= height;
};

export const isPortrait = function () {
    const { height, width } = Dimensions.get("window");
    return width < height;
};

export const isTablet = function () {
    return DeviceInfo.isTablet();
};

export const isMobile = function () {
    return !isTablet();
};

const _handlePickImage = (
    resolve,
    reject,
    response,
    { message = "Authorize access in settings" } = {}
) => {
    if (response.didCancel) {
        resolve(null);
        return;
    }

    if (response.errorCode) {
        if (Platform.OS === "ios" && response.errorCode === "permission") {
            Alert.alert(
                message,
                null,
                [
                    { text: "Not now" },
                    { text: "Settings", onPress: () => Linking.openURL("app-settings:") }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Error",
                `Could not load image. [${response.errorCode}]: ${response.errorMessage || ""}`,
                [{ text: "Close" }],
                {
                    cancelable: false
                }
            );
        }

        reject(
            new Error({
                reason: "error",
                code: response.errorCode,
                message: response.errorMessage
            })
        );
        return;
    }

    resolve(normalizeImage(response));
};
