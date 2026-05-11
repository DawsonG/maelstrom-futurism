import { HTMLAttributes, ReactNode } from 'react';
import { css as emotionCss } from '@emotion/react';
import { useTheme } from '../themes';

export type PillVariant = 'success' | 'warning' | 'alert' | 'info' | 'muted';

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: PillVariant;
    dot?: boolean;
    children: ReactNode;
}

const variantColor = (variant: PillVariant, theme: ReturnType<typeof useTheme>): string => {
    const map: Record<PillVariant, string> = {
        success: theme.color('success'),
        warning: theme.color('warning'),
        alert:   theme.color('alert'),
        info:    theme.color('linkColor'),
        muted:   `${theme.color('textColor')}80`,
    };
    return map[variant];
};

const Pill = ({ variant = 'info', dot = false, children, css, ...rest }: PillProps): ReactNode => {
    const theme = useTheme();
    const color = variantColor(variant, theme);

    const pillStyle = emotionCss`
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: ${theme.pillRadius};
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

    return (
        <span css={[pillStyle, css]} {...rest}>
            {dot && <span css={dotStyle} aria-hidden="true" />}
            {children}
        </span>
    );
};

export default Pill;