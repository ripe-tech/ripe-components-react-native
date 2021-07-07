import {
    Alert,
    Dimensions,
    Linking,
    PermissionsAndroid,
    Platform,
    Vibration,
    ToastAndroid
} from "react-native";
import DeviceInfo from "react-native-device-info";
import DocumentPicker from "react-native-document-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Clipboard from "@react-native-community/clipboard";

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

const normalizeImages = function (images) {
    return images.assets
        ? images.assets.map(image => ({
              uri: image.uri,
              name: image.fileName || getUriBasename(image.uri),
              type: image.type,
              size: image.fileSize,
              width: image.width,
              height: image.height
          }))
        : {
              uri: images.uri,
              name: images.fileName || getUriBasename(images.uri),
              type: images.type,
              size: images.fileSize,
              width: images.width,
              height: images.height
          };
};

export const pickImageCamera = async function ({
    mediaType = "photo",
    retry = true,
    requestPermissions = true
} = {}) {
    const retryFunction = retry
        ? async () =>
              await pickImageCamera({
                  mediaType: mediaType,
                  retry: false,
                  requestPermissions: false
              })
        : null;
    const promise = new Promise((resolve, reject) => {
        launchCamera({ mediaType: mediaType }, response => {
            _handlePickImage(resolve, reject, response, {
                retryFunction: retryFunction,
                requestPermissions: requestPermissions
            });
        });
    });

    const result = await promise;
    return result;
};

export const pickImageGalery = async function ({
    mediaType = "photo",
    selectionLimit = 0,
    retry = true,
    requestPermissions = true
} = {}) {
    const retryFunction = retry
        ? async () =>
              await pickImageGalery({
                  mediaType: mediaType,
                  selectionLimit: selectionLimit,
                  retry: false,
                  requestPermissions: false
              })
        : null;
    const promise = new Promise((resolve, reject) => {
        launchImageLibrary({ mediaType: mediaType, selectionLimit: selectionLimit }, response => {
            _handlePickImage(resolve, reject, response, {
                retryFunction: retryFunction,
                requestPermissions: requestPermissions
            });
        });
    });

    const result = await promise;
    return result;
};

export const requestPermissionCamera = async () =>
    Platform.OS === "android"
        ? await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        : Linking.openURL("app-settings:");

export const notify = function (message) {
    Platform.OS === "android"
        ? ToastAndroid.show(message, ToastAndroid.SHORT)
        : Alert.alert(message);
};

export const toClipboard = function (value, options = { notification: true, vibrate: true }) {
    Clipboard.setString(`${value}`);
    if (options.notification) notify("Copied to clipboard");
    if (options.vibrate) Vibration.vibrate();
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

const _handlePickImage = async (
    resolve,
    reject,
    response,
    {
        message = "Authorize access in settings",
        retryFunction = null,
        requestPermissions = true
    } = {}
) => {
    if (response.didCancel) {
        resolve(null);
        return;
    }

    if (response.errorCode) {
        if (Platform.OS === "ios" && response.errorCode === "permission" && requestPermissions) {
            Alert.alert(
                message,
                null,
                [
                    { text: "Not now" },
                    { text: "Settings", onPress: () => Linking.openURL("app-settings:") }
                ],
                { cancelable: false }
            );
            resolve(retryFunction ? await retryFunction() : null);
        } else if (Platform.OS === "android" && requestPermissions) {
            const permission = await requestPermissionCamera();
            resolve(permission === "granted" && retryFunction ? await retryFunction() : null);
        } else {
            Alert.alert(
                "Error",
                `Could not load image. [${response.errorCode}]: ${response.errorMessage || ""}`,
                [{ text: "Close" }],
                {
                    cancelable: false
                }
            );
            reject(
                new Error({
                    reason: "error",
                    code: response.errorCode,
                    message: response.errorMessage
                })
            );
        }
    }

    resolve(normalizeImages(response));
};
