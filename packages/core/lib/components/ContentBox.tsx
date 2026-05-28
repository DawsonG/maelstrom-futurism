import { CSSProperties, ReactNode } from 'react';
import { css as emotionCss, SerializedStyles } from '@emotion/react';

import Box, { BoxProps } from './Box';
import { composeStyles, isSerializedStyles } from '../utils/composeStyles';

type Variant = 'alert' | 'info' | 'error' | 'warning' | 'normal' | 'success';

export type ContentBoxProps = BoxProps & {
  variant?: Variant;
};

const getColors = (bg?: string, border?: string, variant?: Variant) => {
  if (bg || border) {
    return emotionCss`
      background-color: ${bg || 'var(--mf-content)'};
      border: ${border || 'var(--mf-border)'};
    `;
  }

  switch (variant) {
    case 'alert':
    case 'error':
      return emotionCss`
        background-color: color-mix(in srgb, var(--mf-alert) 40%, transparent);
        border: solid 1px var(--mf-alert);
      `;
    case 'warning':
      return emotionCss`
        background-color: color-mix(in srgb, var(--mf-warning) 40%, transparent);
        border: solid 1px var(--mf-warning);
      `;
    case 'info':
      return emotionCss`
        background-color: color-mix(in srgb, var(--mf-info) 40%, transparent);
        border: solid 1px var(--mf-info);
      `;
    case 'success':
      return emotionCss`
        background-color: color-mix(in srgb, var(--mf-success) 40%, transparent);
        border: solid 1px var(--mf-success);
      `;
    case 'normal':
    default:
      return emotionCss`
        background-color: ${bg || 'var(--mf-content)'};
        border: ${border || 'var(--mf-content)'};
      `;
  }
};

const ContentBox = ({
  background,
  border,
  children,
  variant,
  styles: consumerStyles,
  ...rest
}: ContentBoxProps): ReactNode => {
  const bgColors = getColors(background, border, variant);
  const layoutStyles = emotionCss`
    padding: 0.75rem;
    margin-bottom: 0.25rem;
  `;

  // ContentBox's own base: variant colors then layout (layout wins on conflicts)
  const internalBase = composeStyles(bgColors, layoutStyles);

  if (consumerStyles && !isSerializedStyles(consumerStyles)) {
    // CSSProperties: keep Emotion class intact, apply override as inline style
    // so it beats the class without disturbing the Emotion composition chain.
    return (
      <Box
        styles={internalBase}
        {...rest}
        style={{ ...(consumerStyles as CSSProperties), ...rest.style }}
      >
        {children}
      </Box>
    );
  }

  // SerializedStyles (or no override): compose on top of internal base,
  // then pass to Box which further prepends its own boxBase.
  const boxStyles = consumerStyles
    ? composeStyles(internalBase, consumerStyles as SerializedStyles | SerializedStyles[])
    : internalBase;

  return <Box styles={boxStyles} {...rest}>{children}</Box>;
};

export default ContentBox;
