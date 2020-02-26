import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";

import { ChatMessage } from "../../";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Link", () => {
        const avatarUrl = text(
            "Avatar URL",
            "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar"
        );
        const username = text("Username", "NFSS10");
        const message = text(
            "Message",
            "Cras faucibus mauris sem, vel ultricies turpis venenatis et. Mauris sed tristique purus. Cras vulputate vitae velit eget hendrerit. Aliquam mattis commodo tellus. Sed ac ligula condimentum, euismod eros non, dignissim leo. Donec faucibus lectus non enim tincidunt, at laoreet neque auctor. Nam at arcu tortor. "
        );
        const attachments = [
            {
                name: "dummy.pdf",
                path: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                name: "image.png",
                path: "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar"
            }
        ];
        return (
            <ChatMessage
                avatarUrl={avatarUrl}
                username={username}
                message={message}
                attachments={attachments}
            />
        );
    });
