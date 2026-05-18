import { ReactNode, useRef, useEffect } from 'react';

import * as tooltipStyles from './Tooltip.styles';

interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    trigger?: 'hover' | 'click';
}

const Tooltip = ({
    content,
    children,
    position = 'top',
    trigger = 'hover',
}: TooltipProps): ReactNode => {
    const containerRef = useRef<HTMLDivElement>(null);
    const toggleTooltip = (visible: boolean) => {
        if (visible) {
            containerRef.current!.style.display = 'block';
        } else {
            containerRef.current!.style.display = 'none';
        }
    };

    useEffect(() => {
        if (trigger === 'click') {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    toggleTooltip(false);
                }
            };
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [trigger]);


    return (
        <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => trigger === 'hover' && toggleTooltip(true)}
            onMouseLeave={() => trigger === 'hover' && toggleTooltip(false)}
        >
            {children}

            <div ref={containerRef} style={{ display: "none" }} css={[tooltipStyles.base, tooltipStyles[position]]}>
                {content}
            </div>
        </div>
    );
};

export default Tooltip;
