import { useEffect, useRef, useState } from 'react';
import { Icon } from '@maelstrom-futurism/icons';
import { css as emotionCss } from '@emotion/react';

import Button from './Button';
import { ButtonProps } from './types';

interface DropdownButtonProps extends Omit<ButtonProps, 'onClick'> {
  items?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

const dropdownWrapperStyle = emotionCss`
  position: relative;
  display: inline-block;
`;

const dropdownMenuStyle = emotionCss`
  position: absolute;
  z-index: 10;
  margin-top: 2px;
  width: 98%;

  & button {
    border-radius: 0;
  }
  & button:first-of-type {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  & button:last-of-type {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const dropdownItemStyle = emotionCss`
  display: block;
  width: 100%;
  padding: 10px;
  border: 0;
  text-align: left;
`;

const DropdownButton = (props: DropdownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { children, styles, items, ...rest } = props;

  return (
    <div css={dropdownWrapperStyle} ref={dropdownRef}>
      <Button styles={styles} onClick={() => setIsOpen(!isOpen)} {...rest}>
        {children}
        {' '}
        <Icon icon="CaretDown" size={20} />
      </Button>

      {isOpen && (
        <div css={dropdownMenuStyle}>
          {items?.map((item, index) => (
            <button
              key={index}
              css={dropdownItemStyle}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
