import { CSSProperties, ImgHTMLAttributes, ReactNode } from 'react';
import { css as emotionCss } from '@emotion/react';
import { composeStyles, isSerializedStyles, StyleOverride } from '../utils/composeStyles';

export type RoundImageShape = 'circle' | 'oval';

export type RoundImageProps = {
  /** 'circle' crops to a 1:1 aspect ratio; 'oval' keeps the given width/height
   *  as-is. Both are fully rounded and cropped via `object-fit: cover`.
   *  Defaults to 'circle'. */
  shape?: RoundImageShape;

  /** Rendered width. Defaults to '96px'. */
  width?: string;

  /** Rendered height. Only meaningful for `shape="oval"` — a 'circle' derives
   *  its height from `width` via `aspect-ratio: 1`. Can be smaller or larger
   *  than `width`, producing a wide or tall oval respectively. */
  height?: string;

  styles?: StyleOverride;
  className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'>;

const baseStyle = emotionCss`
  display: block;
  border-radius: 50%;
  object-fit: cover;
`;

export const RoundImage = ({
  shape = 'circle', width = '96px', height, styles, className, alt, ...rest
}: RoundImageProps): ReactNode => {
  const sizeStyle = emotionCss`
    width: ${width};
    ${shape === 'circle' ? 'aspect-ratio: 1;' : `height: ${height || width};`}
  `;

  const roundImageBase = emotionCss`${baseStyle}${sizeStyle}`;

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(roundImageBase, styles)
    : roundImageBase;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  const mergedStyle = (inlineStyle || rest.style)
    ? { ...inlineStyle, ...rest.style }
    : undefined;

  return (
    <img
      css={emotionStyle}
      style={mergedStyle}
      className={className}
      alt={alt}
      {...rest}
    />
  );
};

export default RoundImage;
