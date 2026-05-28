import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { composeStyles, isSerializedStyles, StyleOverride } from '@maelstrom-futurism/core';

import * as tooltipStyles from './Tooltip.styles';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
  /** Style override targeting the tooltip popup. */
  styles?: StyleOverride;
  className?: string;
}

const Tooltip = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  styles,
  className,
}: TooltipProps): ReactNode => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger !== 'click') return;
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [trigger]);

  // Compose all internal layers into a single base class:
  //   base → position → visible (when shown)
  // Consumer's override is then composed on top so it always wins.
  const internalBase = composeStyles(
    tooltipStyles.base,
    isVisible
      ? [tooltipStyles[position], tooltipStyles.visible]
      : [tooltipStyles[position]],
  );

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(internalBase, styles)
    : internalBase;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => trigger === 'hover' && setIsVisible(true)}
      onMouseLeave={() => trigger === 'hover' && setIsVisible(false)}
      onClick={() => trigger === 'click' && setIsVisible(v => !v)}
    >
      {children}

      <div
        ref={tooltipRef}
        onClick={e => e.stopPropagation()}
        css={emotionStyle}
        style={inlineStyle}
        className={className}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
