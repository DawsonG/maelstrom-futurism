import { ReactNode, useRef, useEffect, useState } from 'react';
import { SerializedStyles } from '@emotion/react';

import * as tooltipStyles from './Tooltip.styles';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
  css?: SerializedStyles | SerializedStyles[];
  className?: string;
}

const Tooltip = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  css,
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
        css={[tooltipStyles.base, tooltipStyles[position], isVisible && tooltipStyles.visible, css]}
        className={className}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
