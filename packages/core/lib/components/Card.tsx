import {
  AnchorHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode,
} from 'react';
import { css as emotionCss } from '@emotion/react';
import { composeStyles, isSerializedStyles, StyleOverride } from '../utils/composeStyles';

type CardOwnProps = {
  children?: ReactNode;
  styles?: StyleOverride;

  /** Renders the card as an anchor pointing to this URL, with hover/press
   *  background feedback. Omit to render a plain, non-interactive div. */
  href?: string;

  /** An image (or any element) rendered flush across the top of the card,
   *  clipped to the card's rounded corners. Typically an `<img>`. */
  image?: ReactNode;

  /** A row of actions (e.g. buttons) rendered at the bottom of the card,
   *  separated from the body by a divider. */
  actions?: ReactNode;
};

export type CardProps = CardOwnProps
  & Omit<HTMLAttributes<HTMLDivElement>, 'style'>
  & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style' | 'href'>;

const cardBase = emotionCss`
  display: block;
  overflow: hidden;
  border-radius: var(--mf-radius-card);
  border: var(--mf-border-width-thin) solid var(--mf-border);
  background: var(--mf-content);
  box-shadow: var(--mf-shadow-stuck);
  color: inherit;
  text-decoration: none;
`;

const interactiveCard = emotionCss`
  cursor: pointer;
  transition: background var(--mf-dur-fast) var(--mf-ease), border-color var(--mf-dur-fast) var(--mf-ease);

  &:hover {
    background: var(--mf-surface-hover);
    border-color: var(--mf-secondary);
    text-decoration: none;
  }

  &:active {
    background: var(--mf-surface-press);
  }

  &:focus-visible {
    outline: var(--mf-border-width-medium) solid var(--mf-focus);
    outline-offset: 2px;
  }
`;

const imageStyle = emotionCss`
  display: block;
  width: 100%;

  & > img {
    display: block;
    width: 100%;
    object-fit: cover;
  }
`;

const bodyStyle = emotionCss`
  padding: 1rem;
`;

const actionsStyle = emotionCss`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: var(--mf-border-width-thin) solid var(--mf-border);
`;

const Card = ({
  children, styles, href, image, actions, ...rest
}: CardProps): ReactNode => {
  const base = href ? emotionCss`${cardBase}${interactiveCard}` : cardBase;

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(base, styles)
    : base;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  const content = (
    <>
      {image && <div css={imageStyle}>{image}</div>}
      {children && <div css={bodyStyle}>{children}</div>}
      {actions && <div css={actionsStyle}>{actions}</div>}
    </>
  );

  if (href) {
    return (
      <a href={href} css={emotionStyle} style={inlineStyle} {...rest as AnchorHTMLAttributes<HTMLAnchorElement>}>
        {content}
      </a>
    );
  }

  return (
    <div css={emotionStyle} style={inlineStyle} {...rest as HTMLAttributes<HTMLDivElement>}>
      {content}
    </div>
  );
};

export default Card;
