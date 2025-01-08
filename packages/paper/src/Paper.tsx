import React, { ReactNode } from "react";
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

export default function Paper({
  variant,
  children,
  width,
  centered,
}: {
  variant?: Variant;
  children: ReactNode;
  width?: string;
  centered?: boolean;
}) {
  const theme = useTheme();

  return (
    <div css={[paperStyle(theme, width, centered, variant), getBoxShadow(theme, variant)]}>
      {children}
    </div>
  );
}
