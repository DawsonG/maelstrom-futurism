import { HTMLAttributes, ReactNode } from 'react';
import { css as emotionCss, SerializedStyles, Theme } from '@emotion/react';
import { useTheme } from '../themes';
import { constructStyles, BaseStyles } from '../styleSystem';

export type BoxProps = {
    children?: ReactNode;
} & BaseStyles & HTMLAttributes<HTMLDivElement>;

const Box = (props: BoxProps) => {
    const theme = useTheme();

    const styles = constructStyles(props);
    const { css, children, ...rest } = props;
    const boxStyle = emotionCss`
        width: ${styles.width || '100%'};
        ${styles.height && `height: ${styles.height};`}
        ${styles.margin && `margin: ${styles.margin};`}
        ${styles.background && `background: ${styles.background};`}
        ${styles.border && `border: ${styles.border};`}
        border-radius: ${theme.borderRadius()};
    `;
   
    return <div css={[boxStyle, css]} {...rest}>{children}</div>;
};

export default Box;