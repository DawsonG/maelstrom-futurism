import { css as emotionCss } from '@emotion/react';
import { Icon } from '@maelstrom-futurism/icons';

import Button from './Button';
import Dropdown, { DropdownAlign } from './Dropdown';
import { ButtonProps } from './types';

interface DropdownButtonProps extends Omit<ButtonProps, 'onClick'> {
  items?: Array<{
    label: string;
    onClick: () => void;
  }>;

  /** Which side of the trigger button the menu aligns to. Default 'left'. */
  align?: DropdownAlign;
}

const dropdownMenuListStyle = emotionCss`
  width: 100%;

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
  const { children, styles, items, align, ...rest } = props;

  return (
    <Dropdown
      align={align}
      trigger={({ toggle }) => (
        <Button styles={styles} onClick={toggle} {...rest}>
          {children}
          {' '}
          <Icon icon="CaretDown" size={20} />
        </Button>
      )}
    >
      {({ close }) => (
        <div css={dropdownMenuListStyle}>
          {items?.map((item, index) => (
            <button
              key={index}
              css={dropdownItemStyle}
              onClick={() => {
                item.onClick();
                close();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </Dropdown>
  );
};

export default DropdownButton;
