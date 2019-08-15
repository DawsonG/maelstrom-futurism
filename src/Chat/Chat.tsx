import React, { Component, Fragment } from "react";

import { chatWindow, messageGroup } from "./Chat.styles";

interface MessageInterface {
  isMe: boolean;
  from: string;
  timeStamp: number;
  message: string;
}

interface ChatInterface {
  messages?: Array<MessageInterface>;
}

interface MessageGroupInterface {
  messages?: Array<MessageInterface>;
  isMe: boolean;
}

const MessageGroup = ({ messages, isMe }: MessageGroupInterface) => (
  <div css={messageGroup} className={isMe ? "ours" : ""}>
    {messages && messages.map(m => <div className="message">{m.message}</div>)}
  </div>
);

class Chat extends Component<ChatInterface> {
  renderMessages = () => {
    const { messages } = this.props;
    const children = [];
    let msg = [];

    for (let i = 0; i < messages.length; i++) {
      const current = messages[i];
      let lookAhead = null;
      msg.push(current);

      if (i + 1 < messages.length) {
        lookAhead = messages[i + 1];

        if (current.from !== lookAhead.from) {
          children.push(<MessageGroup messages={msg} isMe={current.isMe} />);
          msg = [];
        }
      } else {
        children.push(<MessageGroup messages={msg} isMe={current.isMe} />);
      }
    }

    return children.map((child, i) => <Fragment key={i}>{child}</Fragment>);
  };

  render() {
    return <div css={chatWindow}>{this.renderMessages()}</div>;
  }
}

export default Chat;
