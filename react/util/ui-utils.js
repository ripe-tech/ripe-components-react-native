import { Alert, Dimensions, Linking, Platform, ToastAndroid } from "react-native";
import DeviceInfo from "react-native-device-info";
import DocumentPicker from "react-native-document-picker";
import ImagePicker from "react-native-image-picker";

import { getBasename } from "./utils";

/**
 * The width in pixels to be used as a comparison and
 * determine if the current device represents a mobile
 * phone "like" device.
 */
const MOBILE_WIDTH = 420;

const normalizeAttachment = function (attachment) {
    return {
        uri: attachment.uri,
        name: attachment.name || getBasename(attachment.uri),
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
        name: image.fileName || getBasename(image.uri),
        type: image.type,
        size: image.fileSize,
        width: image.width,
        height: image.height
    };
};

export const pickImage = async function (options) {
    options =
        options !== undefined
            ? options
            : {
                  title: "Select Image",
                  mediaType: "photo",
                  noData: true,
                  storageOptions: {
                      skipBackup: true,
                      path: "images"
                  }
              };

    const promise = new Promise((resolve, reject) => {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                resolve(null);
                return;
            }

            if (response.error) {
                if (Platform.OS === "ios" && response.error === "Camera permissions not granted") {
                    Alert.alert(
                        "Authorize camera access in settings",
                        null,
                        [
                            { text: "Not now" },
                            { text: "Settings", onPress: () => Linking.openURL("app-settings:") }
                        ],
                        { cancelable: false }
                    );
                } else {
                    Alert.alert("Error", `Could not load image. ${response.error}`, {
                        cancelable: false
                    });
                }

                reject(new Error({ reason: "error", message: response.error }));
                return;
            }

            resolve(normalizeImage(response));
        });
    });

    const result = await promise;
    return result;
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
