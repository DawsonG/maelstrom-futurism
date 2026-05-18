import { css as emotionCss } from '@emotion/react';

import Box, { BoxProps } from "./Box";
import { ReactNode } from 'react';

type Variant = 'alert' | 'info' | 'error' | 'warning' | 'normal' | 'success';

export type ContentBoxProps = BoxProps & {
    variant?: Variant;
}

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
}

const ContentBox = ({
    background,
    border,
    children,
    variant,
    ...rest
}: ContentBoxProps): ReactNode => {
    // map each variant to a set of colors
    const bgColors = getColors(background, border, variant);
    const styles = emotionCss`
        padding: 0.75rem;
        margin-bottom: 0.25rem;
    `;

    return <Box css={[bgColors, styles]} {...rest}>{children}</Box>
};

export default ContentBox;