import { HTMLAttributes, ReactNode } from 'react';
import { css as emotionCss, SerializedStyles } from '@emotion/react';
import { composeStyles } from '../utils/composeStyles';

export type PillVariant = 'success' | 'warning' | 'alert' | 'info' | 'muted';

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  css?: SerializedStyles | SerializedStyles[];
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

const Pill = ({ variant = 'info', dot = false, children, css, ...rest }: PillProps): ReactNode => {
  const color = variantColor(variant);

  const pillStyle = emotionCss`
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
  
  const composed = composeStyles(pillStyle, css);

  const dotStyle = emotionCss`
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
        flex-shrink: 0;
    `;

  return (
    <span css={composed} {...rest}>
      {dot && <span css={dotStyle} aria-hidden="true" />}
      {children}
    </span>
  );
};

export default Pill;
