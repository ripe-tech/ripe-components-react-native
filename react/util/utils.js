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

/**
 * Generates a properties object from the base identifier of a component
 * taking into consideration the current execution context.
 *
 * The resulting structure can be used to access the component from external
 * tools (eg: test automation).
 *
 * @param {String} idPrefix The prefix of the identifier for the element as a plain string.
 * @param {String} idSuffix The suffix of the identifier for the element as a plain string.
 * @returns {Object} The resulting properties object that can be used to add properties
 * to a React component allowing it to be properly selected.
 */
export const genIdProps = function (idPrefix, idSuffix) {
    const id = _genId(idPrefix, idSuffix);
    return Platform.OS === "android"
        ? { accessible: true, accessibilityLabel: id, idPrefix: id }
        : { testID: id, idPrefix: id };
};

/**
 * Generates an identifier from a list of identifiers, sanitizing
 * its internal structure from illegal characters.
 *
 * @param  {...String} ids The sequence of identifiers to generate
 * identifier from.
 */
const _genId = function (...ids) {
    return ids
        .filter(Boolean)
        .map(id => id.trim().toLowerCase().split(" ").join("-"))
        .join("-");
};
