import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { css as emotionCss } from '@emotion/react';
import { composeStyles, isSerializedStyles, StyleOverride } from '../utils/composeStyles';

export type PillVariant = 'success' | 'warning' | 'alert' | 'info' | 'muted';

/** Alias of {@link StyleOverride} — kept for API compatibility. */
export type PillStyles = StyleOverride;

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  styles?: PillStyles;
  variant?: PillVariant;
  dot?: boolean;
  children: ReactNode;
}

const variantColor = (variant: PillVariant): string => {
  const map: Record<PillVariant, string> = {
    success: 'var(--mf-success)',
    warning: 'var(--mf-warning)',
    alert: 'var(--mf-alert)',
    info: 'var(--mf-info)',
    muted: 'var(--mf-text-muted)',
  };
  return map[variant];
};

const Pill = ({ variant = 'info', dot = false, children, styles, ...rest }: PillProps): ReactNode => {
  const color = variantColor(variant);

  const pillBase = emotionCss`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: var(--mf-radius-pill);
    padding: 2px 10px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid ${color};
    background: transparent;
    color: ${color};
  `;

  const dotStyle = emotionCss`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  `;

  // SerializedStyles: compose into a single merged class (override declarations
  // come after base, so they win in the CSS cascade).
  // CSSProperties: applied as an inline style — inline always beats class-based.
  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(pillBase, styles)
    : pillBase;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  // Merge our inline override with any `style` the caller passed via rest,
  // giving the caller's explicit `style` the final say.
  const mergedStyle = (inlineStyle || rest.style)
    ? { ...inlineStyle, ...rest.style }
    : undefined;

  return (
    <span css={emotionStyle} {...rest} style={mergedStyle}>
      {dot && <span css={dotStyle} aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Pill;
