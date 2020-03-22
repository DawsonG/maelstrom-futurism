import React, { ReactNode } from "react";
import { css } from "emotion";

const scales = {
  small: {
    padding: `5px 10px`,
    fontSize: 14
  },
  normal: {
    padding: `10px 20px`,
    fontSize: 16
  },
  big: {
    padding: `20px 30px`,
    fontSize: 18
  }
};

const kind = (outline: boolean) => (bg: string, color: string) => {
  const boxShadowColor = outline ? bg : "transparent";
  const backgroundColor = outline ? "transparent" : bg;

  return {
    background: backgroundColor,
    boxshadow: `inset 0 0 0 1px ${boxShadowColor}`,
    color: `${outline ? bg : color}`,
    transition: "all .3s",
    "&:hover": {
      boxShadow: `inset 0 0 0 1000px ${boxShadowColor}`,
      color
    }
  };
};

export type Variant = "primary" | "secondary" | "cancel" | "dark" | "gray";
export type ButtonType = "button" | "submit";
export type Scale = "small" | "normal" | "big";

const kinds = (variant: Variant, outline: boolean) => {
  const get = kind(outline);

  const rtns = {
    primary: get("#1FB6FF", "white"),
    secondary: get("#5352ED", "white"),
    cancel: get("#FF4949", "white"),
    dark: get("#273444", "white"),
    gray: get("#8492A6", "white")
  };

  return rtns[variant];
};

export interface ButtonProps {
  children?: ReactNode;
  type?: ButtonType;
  scale?: Scale;
  variant?: Variant;
  outline?: boolean;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}

const buttonStyle = css`
  cursor: pointer;
  margin: 6px 5px 0px 0px;
  border: none;
  border-radius: 3px;
`;

export default ({
  children,
  onClick,
  scale = "normal",
  variant = "secondary",
  outline,
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) => (
  <button
    className={buttonStyle}
    css={{
      ...kinds(variant, outline),
      ...scales[scale]
    }}
    onClick={onClick}
    type={type}
    {...rest}
  >
    {children}
  </button>
);
