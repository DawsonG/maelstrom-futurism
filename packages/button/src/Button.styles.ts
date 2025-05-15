import { css, keyframes, SerializedStyles } from "@emotion/react";

export const ripple: SerializedStyles = keyframes`
  to {
    opacity  : 0;
    transform: scale(2);
  }
`;

export const buttonStyle = css`
  cursor: pointer;
  margin: 6px 5px 0px 0px;
  border: none;

  position: relative;
  overflow: hidden;

  div.rippleContainer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    span {
      transform: scale(0);
      border-radius: 100%;
      position: absolute;
      opacity: 0.75;
      background-color: #fff;
      animation: ${ripple} 1000ms;
    }
  }
`;

export const buttonGroupStyle = css`
  & button:first-of-type {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    margin-right: 0;
  }

  & button:not(:first-child):not(:last-child) {
    border-radius: 0px;
    margin-left: 0;
    margin-right: 0;
  }

  & button:last-of-type {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    margin-left: 0;
  }
`;