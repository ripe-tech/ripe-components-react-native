import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import { ChatMessage } from "./chat-message";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Chat Message", () => {
        const avatarUrl = text(
            "Avatar URL",
            "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar"
        );
        const username = text("Username", "NFSS10");
        const message = text(
            "Message",
            "Cras faucibus mauris sem, vel ultricies turpis venenatis et. Mauris sed tristique purus. Cras vulputate vitae velit eget hendrerit. Aliquam mattis commodo tellus. Sed ac ligula condimentum, euismod eros non, dignissim leo. Donec faucibus lectus non enim tincidunt, at laoreet neque auctor. Nam at arcu tortor. "
        );
        const date = number("Date", 1576840199);
        const attachments = [
            {
                name: "dummy.pdf",
                path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                name: "image.png",
                path: "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&model=cube"
            }
        ];
        const status = text("Status", "created");
        const replies = text("Replies", 10);
        const repliesAvatars = Array.from(
            { length: replies },
            () => "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar"
        );

        return (
            <View>
                <ChatMessage
                    avatarUrl={avatarUrl}
                    username={username}
                    message={message || undefined}
                    date={date || new Date()}
                    attachments={attachments}
                />
                <ChatMessage
                    avatarUrl={avatarUrl}
                    username={username}
                    status={status || undefined}
                    replies={replies}
                    repliesAvatars={repliesAvatars}
                    date={date || new Date()}
                />
            </View>
        );
    });
