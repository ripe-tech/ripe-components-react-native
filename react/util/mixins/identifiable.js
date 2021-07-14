import { Platform } from "react-native";

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
