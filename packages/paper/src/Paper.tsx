import { ReactNode } from "react";
import { css } from "@emotion/react";
import { lighten } from "polished";

import { Theme, useTheme } from "@maelstrom-futurism/core";

export enum StackType {
  SINGLE = "single",
  STACK = "stack",
  RANDOM_STACK = "random_stack",
  NONE = "none",
}
type Variant = "single" | "stack" | "random_stack" | "none" | StackType;

export enum HDirection {
  RIGHT = "right",
  CENTER = "center",
  LEFT = "left",
}

export enum VDirection {
  TOP = "top",
  BOTTOM = "bottom",
}

export enum Background {
  NONE = "none",
  GRAPH = "graph",
  DOT = "dot"
}
type BackgroundOptions = "none" | "graph" | "dot" | Background;

/*
 * https://css-tricks.com/snippets/css/stack-of-paper/
 */
const paperStyle = (
  theme: Theme,
  width?: string,
  centered?: boolean,
  variant?: Variant
) => css`
  color: #0e0e0e;
  background-color: #fff;
  padding: 3em;
  margin: 2em 1em;
  ${variant === StackType.NONE
    ? ""
    : `border: solid 1px ${theme.color("secondary")};`}
  position: relative;
  width: ${width};

  h1,
  h2,
  h3,
  h4 {
    margin-top: 0px;
  }

  ${centered &&
  `
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
  `}

  @media only screen and (max-width: ${theme.bp("sm")}) {
    width: 100%;
    padding: 1.5em;
    margin: 0;
  }
`;

const getBoxShadow = (
  theme: Theme,
  variant: Variant | string = StackType.SINGLE,
  // hDirection = HDirection.LEFT,
  vDirection = VDirection.BOTTOM,
) => {
  if (variant == StackType.NONE) {
    return "";
  }

  if (variant == StackType.SINGLE) {
    return css`
      box-shadow: 0px 1px 4px ${lighten(0.1, theme.color("secondary"))};
    `;
  }

  if (variant == StackType.STACK) {
    if (vDirection == VDirection.TOP) {
      return css`
        box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.15), 0 -10px 0 -5px #eee,
          0 -10px 1px -4px rgba(0, 0, 0, 0.15), 0 -20px 0 -10px #eee,
          0 -20px 1px -9px rgba(0, 0, 0, 0.15);
      `;
    } else {
      return css`
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 10px 0 -5px #eee,
          0 10px 1px -4px rgba(0, 0, 0, 0.15), 0 20px 0 -10px #eee,
          0 20px 1px -9px rgba(0, 0, 0, 0.15);
      `;
    }
  }

  if (variant == StackType.RANDOM_STACK) {
    return css`
      &::before,
      &::after {
        content: "";
        position: absolute;
        height: 95%;
        width: 99%;
        background-color: #fafafa;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
        border: 1px solid #bbb;
      }

      &::before {
        right: 15px;
        top: 0;
        transform: rotate(-1deg);
        z-index: -1;
      }

      &::after {
        top: 5px;
        right: -5px;
        transform: rotate(1deg);
        z-index: -2;
      }
    `;
  }

  return '';
};

const backgroundDotted = css`
  background-image: radial-gradient(circle at 1px 1px,rgb(210, 210, 210) 1px, transparent 0);
  background-size: 1.1rem 1.1rem;
`;

const backgroundGraph = css`
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgb(210, 210, 210) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(210, 210, 210) 1px, transparent 1px);
`;

interface PaperProps {
  children: ReactNode;
  variant?: Variant;
  background?: BackgroundOptions;
  width?: string;
  centered?: boolean;
  pre?: boolean;
  font?: string;
}

export default function Paper({
  children,
  variant,
  background,
  width,
  centered,
  pre,
  font,
}: PaperProps) {
  const theme = useTheme();

  let innerStyles = [];
  if (background) {
    switch (background) {
      case Background.DOT:
        innerStyles.push(backgroundDotted);
        break;
      case Background.GRAPH:
        innerStyles.push(backgroundGraph);
        break;
    }
  }

  if (pre) {
    innerStyles.push(css`white-space: pre;text-wrap: wrap;`);
  }

  if (font) {
    innerStyles.push(css`font-family: ${font};`);
  }

  return (
    <div css={[paperStyle(theme, width, centered, variant), getBoxShadow(theme, variant)]}>
      <div css={innerStyles}>
        {children}
      </div>
    </div>
  );
}
