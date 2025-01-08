import React, { HTMLAttributes } from 'react';
import { ArrayInterpolation, css as emotionCss, SerializedStyles, Theme } from '@emotion/react';
import { useTheme } from '../themes';

// TODO: Expand this to be a reusable styled class that accepts theme parameters
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    bg?: string;
    border?: string;
    w?: string;
    h?: string;
    m?: string;
    css?: SerializedStyles;
}

const Box = ({
    bg,
    border,
    children,
    w,
    h,
    m,
    css,
    ...rest
}: BoxProps) => {
    const theme = useTheme();
    const boxStyle = emotionCss`
        width: ${w || '100%'};
        ${h && `height: ${h};`}
        ${m && `margin: ${m};`}
        ${bg && `background-color: ${bg};`}
        ${border && `border: ${border};`}
        border-radius: ${theme.borderRadius()};
    `;
   
    return <div css={[boxStyle, css]} {...rest}>{children}</div>;
};

export default Box;