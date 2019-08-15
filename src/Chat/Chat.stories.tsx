import * as React from "react";
import moment from "moment";
import { storiesOf } from "@storybook/react";

import Chat from "./Chat";

storiesOf("Chat", module).add("Conversation", () => (
  <div style={{ width: "500px" }}>
    <Chat
      messages={[
        {
          isMe: false,
          from: "Abigail",
          timeStamp: moment()
            .subtract(5, "minutes")
            .milliseconds(),
          message: "Hi, I'm Abigail!"
        },
        {
          isMe: true,
          from: "Dawson",
          timeStamp: moment()
            .subtract(4, "minutes")
            .milliseconds(),
          message: "Hi, what's on my todo list today?"
        },
        {
          isMe: false,
          from: "Abigail",
          timeStamp: moment()
            .subtract(3, "minutes")
            .milliseconds(),
          message: "Looks like you have a few items on your list:"
        },
        {
          isMe: false,
          from: "Abigail",
          timeStamp: moment()
            .subtract(3, "minutes")
            .milliseconds(),
          message: "1. Style chat component"
        },
        {
          isMe: false,
          from: "Abigail",
          timeStamp: moment()
            .subtract(3, "minutes")
            .milliseconds(),
          message: "2. Make world osmer"
        },
        {
          isMe: true,
          from: "Dawson",
          timeStamp: moment().milliseconds(),
          message: "Thanks!"
        }
      ]}
    />
  </div>
));
