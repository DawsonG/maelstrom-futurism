import {
  CSSProperties, ReactNode, RefObject, useEffect, useRef, useState,
} from 'react';
import { css as emotionCss } from '@emotion/react';
import { composeStyles, isSerializedStyles, StyleOverride } from '../utils/composeStyles';

export interface CopyButtonTriggerProps {
  onClick: React.MouseEventHandler;
  isCopied: boolean;
}

export type CopyButtonProps = {
  children?: ReactNode;

  /** Render a custom trigger (e.g. the MF `Button` component) instead of the
   *  default plain `<button>`. Receives `onClick` — wire it to the trigger's
   *  own click handler — and `isCopied` for conditional styling/label. When
   *  given, `children` is ignored and native button props (`disabled`, etc.)
   *  are not forwarded — apply them to your custom trigger directly. */
  trigger?: (props: CopyButtonTriggerProps) => ReactNode;

  /** Text to copy. Takes precedence over `targetId`/`targetRef`. If none of
   *  `text`, `targetId`, or `targetRef` are given, the trigger's own
   *  rendered text content is copied — note that a custom `trigger` render
   *  prop has no default `<button>` to read text from, so pass `text` or a
   *  `target*` prop alongside it. */
  text?: string;

  /** id of an element whose `textContent` should be copied. */
  targetId?: string;

  /** Ref to an element whose `textContent` should be copied. */
  targetRef?: RefObject<HTMLElement | null>;

  /** Message shown in the transient tooltip after a successful copy.
   *  Defaults to 'Copied!'. */
  copiedMessage?: ReactNode;

  /** How long the "Copied!" tooltip stays visible, in ms. Defaults to 1500. */
  displayDuration?: number;

  styles?: StyleOverride;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'style'>;

const wrapperStyle = emotionCss`
  position: relative;
  display: inline-block;
`;

const triggerStyle = emotionCss`
  cursor: pointer;
`;

const bubbleBase = emotionCss`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background-color: var(--mf-content);
  color: var(--mf-text);
  padding: 6px 12px;
  border: 1px solid var(--mf-border-muted);
  border-radius: var(--mf-radius-card);
  z-index: var(--mf-z-high);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity var(--mf-dur-fast) ease, visibility var(--mf-dur-fast) ease;

  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-color: transparent;
    border-width: 8px 8px 0;
    border-top-color: var(--mf-border-muted);
  }
  &::after {
    content: '';
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-color: transparent;
    border-width: 7px 7px 0;
    border-top-color: var(--mf-content);
  }
`;

const bubbleVisible = emotionCss`
  opacity: 1;
  visibility: visible;
`;

export const CopyButton = ({
  children,
  trigger,
  text,
  targetId,
  targetRef,
  copiedMessage = 'Copied!',
  displayDuration = 1500,
  styles,
  className,
  onClick,
  ...rest
}: CopyButtonProps): ReactNode => {
  const [isCopied, setIsCopied] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isCopied) return undefined;
    const timer = setTimeout(() => setIsCopied(false), displayDuration);
    return () => clearTimeout(timer);
  }, [isCopied, displayDuration]);

  const handleClick: React.MouseEventHandler = async (event) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);

    const resolvedText = text
      ?? (targetId ? document.getElementById(targetId)?.textContent : undefined)
      ?? targetRef?.current?.textContent
      ?? triggerRef.current?.textContent
      ?? '';

    await navigator.clipboard.writeText(resolvedText);
    setIsCopied(true);
  };

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(triggerStyle, styles)
    : triggerStyle;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  return (
    <span css={wrapperStyle} className={className}>
      {trigger
        ? trigger({ onClick: handleClick, isCopied })
        : (
            <button
              type="button"
              ref={triggerRef}
              css={emotionStyle}
              style={inlineStyle}
              onClick={handleClick}
              {...rest}
            >
              {children}
            </button>
          )}

      <span css={[bubbleBase, isCopied && bubbleVisible]} role="status">
        {copiedMessage}
      </span>
    </span>
  );
};

export default CopyButton;
