import { HTMLAttributes, ReactNode } from 'react';
import { css as emotionCss } from '@emotion/react';
import { constructStyles, BaseStyles } from '../styleSystem';

export type BoxProps = {
  children?: ReactNode;
} & BaseStyles & HTMLAttributes<HTMLDivElement>;

const Box = (props: BoxProps): ReactNode => {
  const styles = constructStyles(props);
  const { css, children, ...rest } = props;
  const boxStyle = emotionCss`
        width: ${styles.width || '100%'};
        ${styles.height && `height: ${styles.height};`}
        ${styles.margin && `margin: ${styles.margin};`}
        ${styles.background && `background: ${styles.background};`}
        ${styles.border && `border: ${styles.border};`}
        border-radius: var(--mf-radius-card);
    `;

  return <div css={[boxStyle, css]} {...rest}>{children}</div>;
};

export default Box;
