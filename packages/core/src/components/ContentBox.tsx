import { css as emotionCss, SerializedStyles } from '@emotion/react';

import Box, { BoxProps } from "./Box";
import { Theme, useTheme } from '../themes';

type Variant = 'alert' | 'info' | 'error' | 'warning' | 'normal';

export interface ContentBoxProps extends BoxProps{
    variant?: Variant;
}

const getColors = (theme: Theme, bg?: string, border?: string, variant?: Variant): SerializedStyles => {
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
                background-color: ${theme.color('alert')};
                border: solid 1px ${theme.color('secondary')};
            `;
        case 'info':
            return emotionCss`
                background-color: ${theme.color('info')};
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
    bg,
    border,
    children,
    variant,
    ...rest
}: ContentBoxProps): JSX.Element => {
    const theme = useTheme();
    // map each variant to a set of colors
    const bgColors = getColors(theme, bg, border, variant);
    

    return <Box css={bgColors} {...rest}>{children}</Box>
};

export default ContentBox;