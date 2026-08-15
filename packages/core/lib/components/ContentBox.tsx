import {
  CSSProperties, ReactNode, useLayoutEffect, useRef, useState,
} from 'react';
import { css as emotionCss, SerializedStyles } from '@emotion/react';

import Box, { BoxProps } from './Box';
import { composeStyles, isSerializedStyles } from '../utils/composeStyles';

type Variant = 'alert' | 'info' | 'error' | 'warning' | 'normal' | 'success';

export type ContentBoxProps = BoxProps & {
  variant?: Variant;

  /** Clamps children to this many lines with a "Show more" toggle beneath.
   *  The toggle only renders when the content actually overflows the clamp. */
  clampLines?: number;
};

const clampContentStyle = (lines: number) => emotionCss`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
  overflow: hidden;
`;

const toggleButtonStyle = emotionCss`
  display: inline-block;
  margin-top: 0.25rem;
  padding: 0;
  border: none;
  background: none;
  color: var(--mf-link);
  font-size: 0.9em;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

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
  clampLines,
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

  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    if (!clampLines || !contentRef.current) return;
    setIsOverflowing(contentRef.current.scrollHeight > contentRef.current.clientHeight);
  }, [clampLines, children]);

  const content = clampLines
    ? (
        <>
          <div ref={contentRef} css={!isExpanded ? clampContentStyle(clampLines) : undefined}>
            {children}
          </div>
          {isOverflowing && (
            <button
              type="button"
              css={toggleButtonStyle}
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </>
      )
    : children;

  if (consumerStyles && !isSerializedStyles(consumerStyles)) {
    // CSSProperties: keep Emotion class intact, apply override as inline style
    // so it beats the class without disturbing the Emotion composition chain.
    return (
      <Box
        styles={internalBase}
        {...rest}
        style={{ ...(consumerStyles as CSSProperties), ...rest.style }}
      >
        {content}
      </Box>
    );
  }

  // SerializedStyles (or no override): compose on top of internal base,
  // then pass to Box which further prepends its own boxBase.
  const boxStyles = consumerStyles
    ? composeStyles(internalBase, consumerStyles as SerializedStyles | SerializedStyles[])
    : internalBase;

  return <Box styles={boxStyles} {...rest}>{content}</Box>;
};

export default ContentBox;
