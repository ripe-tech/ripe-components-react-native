import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { Chat } from "../..";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Chat", () => {
        const avatarUrl = text(
            "Avatar URL",
            "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar"
        );
        const username = text("Username", "NFSS10");
        const messages = [
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar",
                username: "NFSS10",
                message:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et lacus ac arcu ullamcorper condimentum.",
                date: 1574950742823,
                attachments: [
                    {
                        name: "lorem-ipsum.pdf",
                        path:
                            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    },
                    {
                        name: "lorem-ipsum2.pdf",
                        path:
                            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    }
                ]
            },
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/v-da%40platforme.com/avatar",
                username: "3rdvision",
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                date: 1574950742823,
                attachments: [
                    {
                        name: "randomscreenshot.jpeg",
                        path: "https://cdn.platforme.com/images/platforme.square.png"
                    }
                ]
            },
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/t-ms%40platforme.com/avatar",
                username: "BeeMargarida",
                message:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in tristique dui. Praesent a lectus non libero facilisis tincidunt ut.",
                date: 1574950742823,
                attachments: []
            },
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/v-mb%40platforme.com/avatar",
                username: "Benedito0",
                message: "Lorem ipsum dolor sit.",
                date: 1574950742823,
                attachments: []
            },
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/v-fl%40platforme.com/avatar",
                username: "FlaviooLima",
                message: "Lorem ipsum dolor sit.",
                date: 1574950742823,
                attachments: []
            },
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar",
                username: "NFSS10",
                message:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                date: 1574950742823,
                attachments: [
                    {
                        name: "dummy.pdf",
                        path:
                            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    }
                ]
            },
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/t-ms%40platforme.com/avatar",
                username: "BeeMargarida",
                message:
                    "Praesent a lectus non libero facilisis tincidunt ut.",
                date: 1574950742823,
                attachments: []
            },
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/v-da%40platforme.com/avatar",
                username: "3rdvision",
                message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                date: 1574950742823,
                attachments: [
                    {
                        name: "dummy.jpeg",
                        path: "https://sandbox.platforme.com/api/compose?brand=dummy&model=dummy"
                    }
                ]
            },
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar",
                username: "NFSS10",
                message: "Sed tristique faucibus interdum. Cras egestas efficitur sem id mollis. Cras varius malesuada orci, in vulputate urna vulputate a.",
                date: 1574950742823,
                attachments: []
            },
            {
                avatarUrl: "https://id.platforme.com/admin/accounts/t-ms%40platforme.com/avatar",
                username: "BeeMargarida",
                message: "Donec varius eget eros a euismod.",
                date: 1574950742823,
                attachments: []
            }
        ];
        return (
            <Chat
                avatarUrl={avatarUrl}
                username={username}
                messages={messages}
            />
        );
    });
