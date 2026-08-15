import React, {
  CSSProperties, ReactNode, useLayoutEffect, useRef, useState,
} from 'react';
import { composeStyles, debounce, isSerializedStyles } from '@maelstrom-futurism/core';
import { css as emotionCss } from '@emotion/react';

import { buttonStyle, spinnerStyle } from './Button.styles';
import LinkButton from './LinkButton';
import { ButtonProps, ButtonVariant } from './types';

const scales = {
  xs: emotionCss`padding: var(--mf-button-xs-padding); font-size: var(--mf-button-xs-font-size);`,
  sm: emotionCss`padding: var(--mf-button-sm-padding); font-size: var(--mf-button-sm-font-size);`,
  md: emotionCss`padding: var(--mf-button-md-padding); font-size: var(--mf-button-md-font-size);`,
  lg: emotionCss`padding: var(--mf-button-lg-padding); font-size: var(--mf-button-lg-font-size);`,
  xl: emotionCss`padding: var(--mf-button-xl-padding); font-size: var(--mf-button-xl-font-size);`,
};

const variantMapping = {
  secondary: 'var(--mf-secondary)',
  cancel: 'var(--mf-alert)',
  ghost: 'transparent',
  primary: 'var(--mf-primary)',
  link: 'var(--mf-primary)',
  outline: 'var(--mf-primary)',
};

const getVariantStyle = (variant: ButtonVariant, outlineProp: boolean) => {
  const isOutline = outlineProp || variant === 'outline';
  const variantColor = variantMapping[variant];

  const boxShadowColor = isOutline ? variantColor : 'transparent';
  const backgroundColor = isOutline ? 'transparent' : variantColor;

  return emotionCss`
    background: ${backgroundColor};
    box-shadow: inset 0 0 0 1px ${boxShadowColor};
    color: ${isOutline ? variantColor : 'var(--mf-text)'};
    transition: all var(--mf-dur-slow);
    &:hover {
      box-shadow: inset 0 0 0 1000px ${boxShadowColor};
      color: var(--mf-text);
    }
  `;
};

const Button = (props: ButtonProps): ReactNode => {
  if (props.variant === 'link') {
    return <LinkButton {...props} />;
  }

  const {
    children,
    onClick,
    size = 'md',
    variant = 'secondary',
    outline,
    type = 'button',
    disabled = false,
    loading = false,
    styles,
    ...rest
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastKnownWidth = useRef<number | undefined>(undefined);
  const [preservedWidth, setPreservedWidth] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (!loading && buttonRef.current) {
      lastKnownWidth.current = buttonRef.current.offsetWidth;
    }
  });

  useLayoutEffect(() => {
    setPreservedWidth(loading ? lastKnownWidth.current : undefined);
  }, [loading]);

  const buttonBase = emotionCss`
    ${buttonStyle}
    border-radius: var(--mf-radius-button);
    ${getVariantStyle(variant, !!outline)}
    ${scales[size]}
    ${preservedWidth !== undefined && `min-width: ${preservedWidth}px;`}
  `;

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(buttonBase, styles)
    : buttonBase;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  const mergedStyle = (inlineStyle || rest.style)
    ? { ...inlineStyle, ...rest.style }
    : undefined;

  const addRipple = (e: React.MouseEvent) => {
    if (!buttonRef || !buttonRef.current) return;

    const rippleContainer = buttonRef.current.querySelector('div.rippleContainer');
    if (!rippleContainer) return;

    const rippleSize = buttonRef.current.offsetWidth;
    const pos = buttonRef.current.getBoundingClientRect();

    const rippler = document.createElement('span');
    const x = e.pageX - pos.left - rippleSize / 2;
    const y = e.pageY - pos.top - rippleSize / 2;
    rippleContainer.appendChild(rippler);
    rippler.setAttribute(
      'style',
      `top: ${y}px; left: ${x}px; height: ${rippleSize}px; width: ${rippleSize}px;`,
    );
  };

  const cleanUp = () => {
    if (!buttonRef || !buttonRef.current) return;
    const rippleContainer = buttonRef.current.querySelector('div.rippleContainer');
    if (!rippleContainer) return;

    rippleContainer.innerHTML = '';
  };

  return (
    <button
      css={emotionStyle}
      style={mergedStyle}
      onClick={onClick}
      ref={buttonRef}
      onMouseDown={addRipple}
      onMouseUp={debounce(cleanUp, 1500)}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading ? <span css={spinnerStyle} aria-hidden="true" /> : children}
      <div className="rippleContainer" />
    </button>
  );
};

export default Button;
