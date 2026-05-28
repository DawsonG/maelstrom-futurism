import { CSSProperties, ReactNode } from 'react';
import { css } from '@emotion/react';
import { composeStyles, isSerializedStyles } from '@maelstrom-futurism/core';
import { ButtonProps } from './types';

const linkButtonBase = css`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  color: var(--mf-text);

  &:hover {
    color: var(--mf-link);
    text-decoration: underline;
  }
`;

const LinkButton = ({
  children,
  onClick,
  disabled,
  styles,
  ...rest
}: ButtonProps): ReactNode => {
  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(linkButtonBase, styles)
    : linkButtonBase;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  const mergedStyle = (inlineStyle || rest.style)
    ? { ...inlineStyle, ...rest.style }
    : undefined;

  return (
    <button
      css={emotionStyle}
      style={mergedStyle}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default LinkButton;
