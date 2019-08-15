import { css } from "@emotion/core";

import theme from "../theme";

export const wrapper = css`
  border: solid 1px ${theme.color("border")};
  border-radius: 4px;
  box-shadow: 2px 4px 8px ${theme.color("border")};
`;

export const labelList = css`
  padding: 0.3em 0.3em 0.6em 0.3em;
  border-bottom: solid 1px ${theme.color("border")};
`;

export const labelStyle = css`
  padding: 0.5em;
  margin-left: 0.2em;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: bold;
  font-size: 0.8em;
`;

export const inputStyle = css`
  width: 100%;
  border: 0;
  outline: none;

  padding: 0.5em 1em;
  font-family: Roboto, sans-serif;
  font-size: 1em;

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: ${theme.color("muted")};
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: ${theme.color("muted")};
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: ${theme.color("muted")};
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: ${theme.color("muted")};
  }
`;

export const zeroPos = css`
  position: absolute;
  top: 0.5em;
  left: 1em;
  color: transparent;
  pointer-events: none;
  white-space: pre;
  opacity: 0.3;
`;
