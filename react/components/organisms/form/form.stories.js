import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs } from "@storybook/addon-knobs";

import { Form } from "./form";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Form", () => {
        const fields = [
            {
                title: "General Info",
                fields: [
                    {
                        value: "username",
                        label: "Username",
                        type: "text"
                    },
                    {
                        value: "email",
                        label: "Email",
                        type: "text",
                        meta: "email"
                    },
                    {
                        value: "date",
                        label: "Date",
                        type: "date"
                    },
                    {
                        value: "email2",
                        label: "Secondary email",
                        type: "text",
                        meta: "email"
                    },
                    {
                        value: "name",
                        label: "Name",
                        type: "text"
                    },
                    {
                        value: "description",
                        label: "Description",
                        type: "text",
                        meta: "long"
                    }
                ]
            },
            {
                title: "Personal Details",
                fields: [
                    {
                        label: "Age",
                        value: "age",
                        type: "text",
                        meta: "number"
                    },
                    {
                        label: "Number of dogs",
                        value: "dogs",
                        type: "text",
                        meta: "number"
                    }
                ]
            }
        ];
        const values = {};

        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "height" : undefined}
            >
                <Form fields={fields} values={values} />
            </KeyboardAvoidingView>
        );
    });
