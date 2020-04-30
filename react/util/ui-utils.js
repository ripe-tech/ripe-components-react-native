import { Alert, Dimensions, Linking, Platform, ToastAndroid } from "react-native";
import DocumentPicker from "react-native-document-picker";
import ImagePicker from "react-native-image-picker";

const TABLET_WIDTH = 1024;
const MOBILE_WIDTH = 420;

const normalizeAttachment = function (attachment) {
    return {
        uri: attachment.uri,
        name: attachment.name,
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
        name: image.fileName,
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
                    Alert.alert("Error", "Could not load image", { cancelable: false });
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

export const isTablet = function () {
    const { height, width } = Dimensions.get("window");
    if (isLandscape()) return height > MOBILE_WIDTH && height <= TABLET_WIDTH;
    return width > MOBILE_WIDTH && width <= TABLET_WIDTH;
};

export const isMobile = function () {
    const windowWidth = Dimensions.get("window").width;
    return windowWidth <= MOBILE_WIDTH;
};

export const isLandscape = function () {
    const { height, width } = Dimensions.get("window");
    return width >= height;
};

export const isPortrait = function () {
    const { height, width } = Dimensions.get("window");
    return width < height;
};

export const addWidthBreakpoint = function (name, range = []) {
    this.widthBreakpoints = this.widthBreakpoints || [];
    this.widthBreakpoints.push([name, range]);
};

export const removeWidthBreakpoint = function (name) {
    this.widthBreakpoints = this.widthBreakpoints || [];
    this.widthBreakpoints = this.widthBreakpoints.filter(v => v[0] !== name);
    document.body.classList.remove(name);
};

export const addHeightBreakpoint = function (name, range = []) {
    this.heightBreakpoints = this.heightBreakpoints || [];
    this.heightBreakpoints.push([name, range]);
};

export const removeHeightBreakpoint = function (name) {
    this.heightBreakpoints = this.heightBreakpoints || [];
    this.heightBreakpoints = this.heightBreakpoints.filter(v => v[0] !== name);
    document.body.classList.remove(name);
};

export const notify = function (message) {
    Platform.OS === "android"
        ? ToastAndroid.show(message, ToastAndroid.SHORT)
        : Alert.alert(message);
};
