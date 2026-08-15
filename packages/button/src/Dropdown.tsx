import { ReactNode, useEffect, useRef, useState } from 'react';
import { css as emotionCss } from '@emotion/react';

export type DropdownAlign = 'left' | 'right';

export interface DropdownRenderProps {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export interface DropdownProps {
  /** The element that opens/closes the menu. Either a static node (click
   *  toggles the menu automatically) or a render prop for full control over
   *  the trigger's own click handling and open/closed appearance. */
  trigger: ReactNode | ((props: DropdownRenderProps) => ReactNode);

  /** Menu content, rendered only while open. Either a static node or a
   *  render prop, useful for closing the menu when an item is activated. */
  children?: ReactNode | ((props: DropdownRenderProps) => ReactNode);

  /** Which side of the trigger the menu's edge aligns to. Default 'left'. */
  align?: DropdownAlign;

  /** className applied to the outer wrapper */
  className?: string;
}

const dropdownWrapperStyle = emotionCss`
  position: relative;
  display: inline-block;
`;

const dropdownMenuStyle = (align: DropdownAlign) => emotionCss`
  position: absolute;
  top: 100%;
  ${align === 'right' ? 'right: 0;' : 'left: 0;'}
  z-index: 10;
  margin-top: 2px;
  min-width: 100%;
`;

export const Dropdown = ({ trigger, children, align = 'left', className }: DropdownProps): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div css={dropdownWrapperStyle} className={className} ref={wrapperRef}>
      {typeof trigger === 'function'
        ? trigger({ isOpen, toggle, close })
        : (
            <div onClick={toggle}>{trigger}</div>
          )}

      {isOpen && (
        <div css={dropdownMenuStyle(align)}>
          {typeof children === 'function' ? children({ isOpen, toggle, close }) : children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
