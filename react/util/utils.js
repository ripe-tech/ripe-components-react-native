import { Platform } from "react-native";

export const dateString = function (timestamp, { separator = "/", year = true } = {}) {
    const date = new Date(timestamp * 1000);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const yearText = year ? `${separator}${date.getFullYear()}` : "";
    return day + separator + month + yearText;
};

export const dateStringUTC = function (timestamp, { separator = "/", year = true } = {}) {
    const date = new Date(timestamp * 1000);
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const yearText = year ? `${separator}${date.getFullYear()}` : "";
    return day + separator + month + yearText;
};

export const timeString = function (timestamp, { separator = ":" } = {}) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    return hours + separator + minutes + separator + seconds;
};

export const timeStringUTC = function (timestamp, { separator = ":" } = {}) {
    const date = new Date(timestamp * 1000);
    const hours = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours();
    const minutes = date.getUTCMinutes() < 10 ? `0${date.getUTCMinutes()}` : date.getUTCMinutes();
    const seconds = date.getUTCSeconds() < 10 ? `0${date.getUTCSeconds()}` : date.getUTCSeconds();
    return hours + separator + minutes + separator + seconds;
};

export const sameDay = function (first, second) {
    return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
    );
};

export const dateTimeString = function (timestamp) {
    return sameDay(new Date(), new Date(timestamp))
        ? timeString(timestamp)
        : `${dateString(timestamp)} ${timeString(timestamp)}`;
};

export const normalize = function (value) {
    return value.split("_").join(" ");
};

export const capitalize = function (value) {
    if (!value) return value;
    return value[0].toUpperCase() + value.slice(1);
};

export const isImage = function (fileName) {
    const regex = /\.(jpg|jpeg|png|gif)$/i;
    return regex.test(fileName);
};

export const testId = function (id, normalizeId = true) {
    if (!id) return {};
    const normalized = normalizeId ? id.trim().toLowerCase().split(" ").join("-") : id;
    return Platform.OS === "android" ?
        { accessible: true, accessibilityLabel: normalized } :
        { testID: normalized }
};
