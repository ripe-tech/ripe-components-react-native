import { Alert } from "react-native";
import DocumentPicker from "react-native-document-picker";
import ImagePicker from "react-native-image-picker";

const normalizeAttachment = function(attachment) {
    return {
        uri: attachment.uri,
        name: attachment.name,
        type: attachment.type,
        size: attachment.size
    };
};

export const pickDocuments = async function(options = {}) {
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

const normalizeImage = function(image) {
    return {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
        size: image.fileSize,
        width: image.width,
        height: image.height
    };
};

export const pickImage = async function(options) {
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
                Alert.alert("Error", "Could not load image", { cancelable: false });
                reject(new Error({ reason: "error", message: response.error }));
                return;
            }

            resolve(normalizeImage(response));
        });
    });

    const result = await promise;
    return result;
};
