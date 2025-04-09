import { css as emotionCss, SerializedStyles } from '@emotion/react';

import Box, { BoxProps } from "./Box";
import { Theme, useTheme } from '../themes';

type Variant = 'alert' | 'info' | 'error' | 'warning' | 'normal' | 'success';

export type ContentBoxProps = BoxProps & {
    variant?: Variant;
}

const getColors = (theme: Theme, bg?: string, border?: string, variant?: Variant) => {
    if (bg || border) {
        return emotionCss`
            background-color: ${bg || theme.color('content')};
            border: ${border || theme.color('secondary')};
        `;
    }
    
    switch (variant) {
        case 'alert':
        case 'error':
            return emotionCss`
                background-color: ${theme.color('alert')};
                border: solid 1px ${theme.color('secondary')};
            `;
        case 'warning':
            return emotionCss`
                color: black;
                background-color: ${theme.color('warning')};
                border: solid 1px ${theme.color('secondary')};
            `;
        case 'info':
            return emotionCss`
                background-color: ${theme.color('info')};
                border: solid 1px ${theme.color('secondary')};
            `;
        case 'success':
            return emotionCss`
                background-color: ${theme.color('success')};
                border: solid 1px ${theme.color('secondary')};
            `;
        case 'normal':
        default:
            return emotionCss`
                background-color: ${bg || theme.color('content')};
                border: ${border || theme.color('secondary')};
            `;
    }
}

const ContentBox = ({
    background,
    border,
    children,
    variant,
    ...rest
}: ContentBoxProps): JSX.Element => {
    const theme = useTheme();
    // map each variant to a set of colors
    const bgColors = getColors(theme, background, border, variant);
    const styles = emotionCss`
        padding: 0.75rem;
        margin-bottom: 0.25rem;
    `;
    

    return <Box css={[bgColors, styles]} {...rest}>{children}</Box>
};

export default ContentBox;