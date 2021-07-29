import { css } from "@emotion/react";

export const styledTooltip = (left: number, top: number, show: boolean) => css`
  position: fixed;
  background: #2b2d33;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 8px 8px;
  color: #ffffff;

  left: ${left}px;
  top: ${top}px;
  ${!show && "visibility: hidden;"}

  &:after {
    content: "";
    position: absolute;
    left: calc(50% - 2px);
    top: -4px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;

    border-bottom: 4px solid black;
  }
`;
