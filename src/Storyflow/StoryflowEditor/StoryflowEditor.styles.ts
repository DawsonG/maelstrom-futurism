import { css } from "@emotion/core";
import { lighten } from "polished";

import theme from "../../theme";

const borderGray = "#fafafa";

export const masterContainer = css`
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(-90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    linear-gradient(
      transparent 3px,
      ${borderGray} 3px,
      ${borderGray} 78px,
      transparent 78px
    ),
    linear-gradient(-90deg, #aaa 1px, transparent 1px),
    linear-gradient(
      -90deg,
      transparent 3px,
      ${borderGray} 3px,
      ${borderGray} 78px,
      transparent 78px
    ),
    linear-gradient(#aaa 1px, transparent 1px), #aaaaaa;
  background-size: 16px 16px, 16px 16px, 64px 64px, 64px 64px, 64px 64px,
    64px 64px, 64px 64px, 64px 64px;
  position: relative;
  width: 100%;
  height: 500px;
`;

export const svgContainer = css`
  width: 100%;
  height: 100%;
  zindex: 10;
`;

export const storyContainer = css`
  position: absolute;
  border: solid 1px ${theme.color("border")};
  background-color: ${theme.color("trueWhite")};
  z-index: 3;

  padding: 0.8em;
  width: 128px;
  max-height: 128px;
  box-shadow: 0px 1px 4px ${lighten(0.1, theme.color("border"))};
`;

export const storyDndPreview = css`
  opacity: 0.8;
  display: inline-block;
  transform: rotate(-7deg);
`;

export const titleStyle = css`
  position: relative;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
`;

export const handleStyle = css`
  position: absolute;
  left: 10px;
`;
