module.exports = {
    root: true,
    extends: "@react-native-community",
    rules: {
        quotes: [
            "error",
            "double",
            {
                avoidEscape: true
            }
        ],
        semi: ["error", "always"],
        "comma-dangle": ["error", "never"],
        "space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always"
            }
        ],
        "no-alert": "off",
        "react-native/no-inline-styles": "off",
        "react/no-did-mount-set-state": "off",
        "react/no-did-update-set-state": "off",
        curly: "off"
    }
};
