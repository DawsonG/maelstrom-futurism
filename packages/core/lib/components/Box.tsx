import { CSSProperties, HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { css as emotionCss } from '@emotion/react';
import { composeStyles, isSerializedStyles } from '../utils/composeStyles';
import { constructStyles, BaseStyles } from '../styleSystem';

export type BoxProps = {
  children?: ReactNode;

  /** Makes the box stick to the top of its scroll container once it would
   *  otherwise scroll out of view, gaining a shadow while stuck. */
  sticky?: boolean;

  /** Offset from the top of the scroll container while stuck, and the
   *  distance from the top used to detect when the box becomes stuck.
   *  Defaults to '0px'. Only used when `sticky` is set. */
  stickyOffset?: string;
} & BaseStyles & HTMLAttributes<HTMLDivElement>;

const sentinelStyle = emotionCss`
  height: 1px;
  margin-bottom: -1px;
`;

const Box = (props: BoxProps): ReactNode => {
  const resolved = constructStyles(props);
  const {
    styles, children, sticky, stickyOffset = '0px', ...rest
  } = props;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    if (!sticky || !sentinelRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: `-${stickyOffset} 0px 0px 0px` },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [sticky, stickyOffset]);

  const boxBase = emotionCss`
    width: ${resolved.width || '100%'};
    ${resolved.height && `height: ${resolved.height};`}
    ${resolved.margin && `margin: ${resolved.margin};`}
    ${resolved.background && `background: ${resolved.background};`}
    ${resolved.border && `border: ${resolved.border};`}
    border-radius: var(--mf-radius-card);
    ${sticky && `
      position: sticky;
      top: ${stickyOffset};
      transition: box-shadow var(--mf-dur-fast) var(--mf-ease);
      ${isStuck && `box-shadow: var(--mf-shadow-stuck);`}
    `}
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
    <>
      {sticky && <div ref={sentinelRef} css={sentinelStyle} />}
      <div css={emotionStyle} {...rest} style={mergedStyle} data-stuck={sticky ? isStuck : undefined}>
        {children}
      </div>
    </>
  );
};

export default Box;
