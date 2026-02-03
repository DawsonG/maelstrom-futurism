import React, { ReactNode, useRef } from "react";
import { useTheme, debounce, Theme } from "@maelstrom-futurism/core";
import { css as emotionCss } from "@emotion/react";

import { buttonStyle } from "./Button.styles";
import LinkButton from "./LinkButton";
import { ButtonProps, ButtonVariant } from "./types";

const scales = {
  xs: emotionCss`
    padding: 2px 4px;
    font-size: 12px;
  `,
  sm: emotionCss`
    padding: 5px 10px;
    font-size: 14px;
  `,
  md: emotionCss`
    padding: 10px 20px;
    font-size: 16px;
  `,
  lg: emotionCss`
    padding: 20px 30px;
    font-size: 18px;
  `,
  xl: emotionCss`
    padding: 30px 40px;
    font-size: 20px;
  `,
};

const colors = (theme: Theme) => ({
  secondary: [theme.color("secondary"), theme.color("textColor")],
  cancel: [theme.color("alert"), theme.color("textColor")],
  ghost: ["transparent", theme.color("textColor")],
  primary: [theme.color("primary"), theme.color("textColor")],
  link: [theme.color("primary"), theme.color("textColor")],
});

const getVariantStyle = (theme: Theme, variant: ButtonVariant, outline: boolean) => {
  const lcolors = colors(theme)[variant];
  
  const boxShadowColor = outline ? lcolors[0] : "transparent";
  const backgroundColor = outline ? "transparent" : lcolors[0];

  return emotionCss`
    background: ${backgroundColor};
    boxShadow: inset 0 0 0 1px ${boxShadowColor};
    color: ${outline ? lcolors[0] : lcolors[1]};
    transition: all .3s;
    &:hover: {
      boxShadow: inset 0 0 0 1000px ${boxShadowColor};
      color: ${lcolors[1]};
    }
  `;
};

const Button = (props: ButtonProps): ReactNode => {
  const theme = useTheme();
  
  if (props.variant === "link") {
    return <LinkButton theme={theme} {...props}/>
  }

  const {
    children,
    onClick,
    size = "lg",
    variant = "secondary",
    outline,
    type = "button",
    disabled = false,
    css,
    ...rest
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonStyleByTheme = emotionCss`
    ${buttonStyle}
    border-radius: ${theme.buttonRadius};

    ${getVariantStyle(theme, variant, !!outline)}
    ${scales[size]}
    ${css ?? css}
  `;

  const addRipple = (e: React.MouseEvent) => {
    if (!buttonRef || !buttonRef.current) return;
    
    const rippleContainer = buttonRef.current.querySelector("div.rippleContainer");
    if (!rippleContainer) return;
    
    const rippleSize = buttonRef.current.offsetWidth;
    const pos = buttonRef.current.getBoundingClientRect();

    const rippler = document.createElement("span");
    const x = e.pageX - pos.left - rippleSize / 2;
    const y = e.pageY - pos.top - rippleSize / 2;
    rippleContainer.appendChild(rippler);
    rippler.setAttribute(
      "style",
      `top: ${y}px; left: ${x}px; height: ${rippleSize}px; width: ${rippleSize}px;`
    );
  };

  const cleanUp = () => {
    if (!buttonRef || !buttonRef.current) return;
    const rippleContainer = buttonRef.current.querySelector("div.rippleContainer");
    if (!rippleContainer) return;
    
    rippleContainer.innerHTML = "";
  };

  return (
    <button
      css={buttonStyleByTheme}
      onClick={onClick}
      ref={buttonRef}
      onMouseDown={addRipple}
      onMouseUp={debounce(cleanUp, 1500)}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {children}
      <div className="rippleContainer" />
    </button>
  );
};

export default Button;