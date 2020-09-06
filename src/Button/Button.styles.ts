import { css, keyframes } from "@emotion/core";

export const ripple = keyframes`
  to {
    opacity  : 0;
    transform: scale(2);
  }
`;

export const buttonStyle = css`
  cursor: pointer;
  margin: 6px 5px 0px 0px;
  border: none;
  border-radius: 3px;

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
