import { Platform } from "react-native";
import { readFile as readFileFs } from "react-native-fs";
import { Buffer } from "buffer";
import ripe from "ripe-sdk";

export const dateString = function (
    timestamp,
    { separator = "/", year = true, reverse = false } = {}
) {
    const date = new Date(timestamp * 1000);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const yearText = year ? `${separator}${date.getFullYear()}` : "";
    const text = day + separator + month + yearText;
    return reverse ? text.split(separator).reverse().join(separator) : text;
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

export const readFile = async function (file) {
    const base64 = file.base64 || (await readFileFs(file.uri, "base64"));
    const bytes = new Buffer.from(base64, "base64");
    return bytes;
};

export const fileToFileTuple = async function (file) {
    const bytes = await readFile(file);
    return ripe.ripe.FileTuple.fromData(bytes, file.name, file.type);
};

export const isPrimitive = function (object) {
    return object !== Object(object);
};

export const typeOf = function (object) {
    if (object === null) return "null";
    if (Array.isArray(object)) return "array";
    return typeof object;
};

export const equal = function (first, second) {
    if (first === second) {
        return true;
    }

    if (typeOf(first) !== typeOf(second)) {
        return false;
    }

    if (isPrimitive(first) && isPrimitive(second)) {
        return first === second;
    }

    if (Object.keys(first).length !== Object.keys(second).length) {
        return false;
    }

    for (const key in first) {
        if (!(key in second)) return false;
        if (!equal(first[key], second[key])) return false;
    }

    return true;
};

/**
 * Retrieves the inferred base name value from the provided URI.
 *
 * The heuristic used is quite basic, gathering the last part
 * of the URI path as the name.
 *
 * @param {String} uri The URI to be as the base input and from which
 * the last part is going to be used as the name.
 * @returns {String} The base name inferred from the URI or a `null`
 * value in case none is found.
 */
export const getUriBasename = function (uri) {
    if (!uri) return null;
    return uri ? uri.substring(uri.lastIndexOf("/") + 1, uri.length) : null;
};

/**
 * Mixin that adds functionality related with the identification
 * of components for external selection.
 *
 * @param {Class} superclass Parent class to be encapsulated with
 * this mixin.
 * @returns {Class} The new class with the added identifiable
 * functionality.
 */
export const IdentifiableMixin = superclass =>
    class extends superclass {
        /**
         * @see {@link genIdProps}
         */
        id(id) {
            return this.genIdProps(id);
        }

        /**
         * Generates a properties object from the base identifier of a component
         * taking into consideration the current execution context.
         *
         * The resulting structure can be used to access the component from external
         * tools (eg: test automation).
         *
         * @param {String} idSuffix The suffix of the identifier for the element as a plain string.
         * @returns {Object} The resulting properties object that can be used to add properties
         * to a React component allowing it to be properly selected.
         */
        genIdProps(idSuffix) {
            const id = this._genId(this.props.idPrefix, idSuffix);
            return Platform.OS === "android"
                ? { accessible: true, accessibilityLabel: id, idPrefix: id }
                : { testID: id, idPrefix: id };
        }

        /**
         * Generates an identifier from a list of identifiers, sanitizing
         * its internal structure from illegal characters.
         *
         * @param  {...String} ids The sequence of identifiers to generate
         * identifier from.
         */
        _genId(...ids) {
            return ids
                .filter(Boolean)
                .map(id => id.trim().toLowerCase().split(" ").join("-"))
                .join("-");
        }
    };
