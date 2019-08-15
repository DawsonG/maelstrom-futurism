import { css } from "@emotion/core";

import theme from "../theme";

export const chatWindow = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border: solid 1px ${theme.color("border")};
  border-radius: 4px;
  padding: 0.5em 1em;
  box-shadow: 2px 4px 8px ${theme.color("border")};
  width: 100%;
  min-height: 4em;
`;

export const messageGroup = css`
  max-width: 80%;
  margin: 0.5em;

  &.ours {
    align-self: flex-end;

    > .message {
      background-color: #eeeeee;
      color: #000;
    }
  }

  .message {
    margin: 1px;
    padding: 0.5em 1em;
    background-color: #08f;
    color: #fff;
  }

  .message:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .message:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
