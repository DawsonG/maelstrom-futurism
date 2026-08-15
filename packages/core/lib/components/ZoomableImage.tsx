import { CSSProperties, ImgHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css as emotionCss, keyframes } from '@emotion/react';
import { EASE_FUNCTION } from '../motion';
import { composeStyles, isSerializedStyles, StyleOverride } from '../utils/composeStyles';

export type ZoomableImageProps = {
  /** Style override applied to the inline (non-zoomed) <img>. */
  styles?: StyleOverride;
  className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'onClick'>;

const thumbnailStyle = emotionCss`
  cursor: zoom-in;
`;

const overlayFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const overlay = emotionCss`
  position: fixed;
  inset: 0;
  z-index: var(--mf-z-top);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: color-mix(in srgb, var(--mf-background) 92%, transparent);
  cursor: zoom-out;
  animation: ${overlayFadeIn} var(--mf-dur-fast) ${EASE_FUNCTION};
`;

const fullImageEnter = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const fullImageStyle = emotionCss`
  max-width: 90vw;
  max-height: 90vh;
  cursor: zoom-out;
  animation: ${fullImageEnter} var(--mf-dur-normal) ${EASE_FUNCTION};
`;

const closeButtonStyle = emotionCss`
  position: fixed;
  top: var(--mf-space-4);
  right: var(--mf-space-4);
  z-index: var(--mf-z-top);
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  background-color: transparent;
  color: var(--mf-text);
  opacity: 0.6;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 1;
  }
`;

export const ZoomableImage = ({ styles, className, alt, ...rest }: ZoomableImageProps): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(thumbnailStyle, styles)
    : thumbnailStyle;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  const mergedStyle = (inlineStyle || rest.style)
    ? { ...inlineStyle, ...rest.style }
    : undefined;

  return (
    <>
      <img
        css={emotionStyle}
        style={mergedStyle}
        className={className}
        alt={alt}
        onClick={() => setIsOpen(true)}
        {...rest}
      />

      {isOpen && ReactDOM.createPortal(
        <div css={overlay} onClick={() => setIsOpen(false)}>
          <button
            type="button"
            css={closeButtonStyle}
            aria-label="Close"
            onClick={() => setIsOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <img css={fullImageStyle} src={rest.src} alt={alt} />
        </div>,
        document.body,
      )}
    </>
  );
};

export default ZoomableImage;
