import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { css as emotionCss } from '@emotion/react';
import { composeStyles, isSerializedStyles } from '../utils/composeStyles';
import { constructStyles, BaseStyles } from '../styleSystem';

export type BoxProps = {
  children?: ReactNode;
} & BaseStyles & HTMLAttributes<HTMLDivElement>;

const Box = (props: BoxProps): ReactNode => {
  const resolved = constructStyles(props);
  const { styles, children, ...rest } = props;

  const boxBase = emotionCss`
    width: ${resolved.width || '100%'};
    ${resolved.height && `height: ${resolved.height};`}
    ${resolved.margin && `margin: ${resolved.margin};`}
    ${resolved.background && `background: ${resolved.background};`}
    ${resolved.border && `border: ${resolved.border};`}
    border-radius: var(--mf-radius-card);
  `;

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(boxBase, styles)
    : boxBase;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  const mergedStyle = (inlineStyle || rest.style)
    ? { ...inlineStyle, ...rest.style }
    : undefined;

  return (
    <div css={emotionStyle} {...rest} style={mergedStyle}>
      {children}
    </div>
  );
};

export default Box;
