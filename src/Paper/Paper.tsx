import React, { ReactNode } from "react";
import { css } from "@emotion/core";
import { lighten } from "polished";

import theme from "../theme";

export enum Variant {
  SINGLE = "single",
  STACK = "stack",
  RANDOM_STACK = "random_stack",
  NONE = "none"
}

export enum HDirection {
  RIGHT = "right",
  CENTER = "center",
  LEFT = "left"
}

export enum VDirection {
  TOP = "top",
  BOTTOM = "bottom"
}

/*
 * https://css-tricks.com/snippets/css/stack-of-paper/
 */
const paperStyle = (
  width: string,
  centered: boolean,
  variant?: Variant | string
) => css`
  background-color: ${theme.color("trueWhite")};
  padding: 3em;
  margin: 2em 1em;
  ${variant === Variant.NONE
    ? ""
    : `border: solid 1px ${theme.color("border")};`}
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
`;

const getBoxShadow = (
  variant: Variant | string = Variant.SINGLE,
  hDirection = HDirection.LEFT,
  vDirection = VDirection.BOTTOM
) => {
  if (variant == Variant.NONE) {
    return "";
  }

  if (variant == Variant.SINGLE) {
    return css`
      box-shadow: 0px 1px 4px ${lighten(0.1, theme.color("border"))};
    `;
  }

  if (variant == Variant.STACK) {
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

  if (variant == Variant.RANDOM_STACK) {
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

  console.log(hDirection, vDirection);
};

export default function Paper({
  variant,
  children,
  width,
  centered
}: {
  variant?: Variant | string;
  children: ReactNode;
  width?: string;
  centered?: boolean;
}) {
  return (
    <div css={[paperStyle(width, centered, variant), getBoxShadow(variant)]}>
      {children}
    </div>
  );
}
