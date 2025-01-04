import { css as emotionCss } from '@emotion/react';

import Box, { BoxProps } from "./Box";
import { useTheme } from '../themes';

export interface ContentBoxProps extends BoxProps{}

const ContentBox = ({
    bg,
    border,
    children,
    ...rest
}: ContentBoxProps): JSX.Element => {
    const theme = useTheme();
    const bgColors = emotionCss`
        background-color: ${bg || theme.color('content')};
        border: ${border || theme.color('secondary')};
    `;

    return <Box css={bgColors} {...rest}>{children}</Box>
};

export default ContentBox;