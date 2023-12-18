import React, { ReactNode, useRef } from "react";

import debounce from "./utils/debounce";

import { buttonStyle } from "./Button.styles";

const scales = {
  small: {
    padding: `5px 10px`,
    fontSize: 14,
  },
  normal: {
    padding: `10px 20px`,
    fontSize: 16,
  },
  big: {
    padding: `20px 30px`,
    fontSize: 18,
  },
};

const kind = (outline: boolean) => (bg: string, color: string) => {
  const boxShadowColor = outline ? bg : "transparent";
  const backgroundColor = outline ? "transparent" : bg;

  return {
    background: backgroundColor,
    boxShadow: `inset 0 0 0 1px ${boxShadowColor}`,
    color: `${outline ? bg : color}`,
    transition: "all .3s",
    "&:hover": {
      boxShadow: `inset 0 0 0 1000px ${boxShadowColor}`,
      color,
    },
  };
};

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "cancel"
  | "dark"
  | "gray";
export type ButtonType = "button" | "submit";
export type Scale = "small" | "normal" | "big";

const kinds = (variant: ButtonVariant, outline: boolean) => {
  const get = kind(outline);

  const rtns = {
    primary: get("#1FB6FF", "white"),
    secondary: get("#5352ED", "white"),
    cancel: get("#FF4949", "white"),
    dark: get("#273444", "white"),
    gray: get("#8492A6", "white"),
  };

  return rtns[variant];
};

export interface ButtonProps {
  children?: ReactNode;

  /**
   * Either type="submit" or type="button"
   */
  type?: ButtonType;

  scale?: Scale;
  variant?: ButtonVariant;
  outline?: boolean;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  scale = "normal",
  variant = "secondary",
  outline,
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const addRipple = (e: React.MouseEvent) => {
    if (!buttonRef || !buttonRef.current) return;
    
    const rippleContainer = buttonRef.current.querySelector("div");
    if (!rippleContainer) return;
    
    const size = buttonRef.current.offsetWidth;
    const pos = buttonRef.current.getBoundingClientRect();

    const rippler = document.createElement("span");
    const x = e.pageX - pos.left - size / 2;
    const y = e.pageY - pos.top - size / 2;
    rippleContainer.appendChild(rippler);
    rippler.setAttribute(
      "style",
      `top: ${y}px; left: ${x}px; height: ${size}px; width: ${size}px;`
    );
  };

  const cleanUp = () => {
    if (!buttonRef || !buttonRef.current) return;
    const rippleContainer = buttonRef.current.querySelector("div");
    if (!rippleContainer) return;
    
    rippleContainer.innerHTML = "";
  };


  return (
    <button
      css={[buttonStyle, kinds(variant, !!outline), scales[scale]]}
      onClick={onClick}
      ref={buttonRef}
      onMouseDown={addRipple}
      onMouseUp={debounce(cleanUp, 2000)}
      type={type}
      {...rest}
    >
      {children}
      <div className="rippleContainer" />
    </button>
  );
};

export default Button;