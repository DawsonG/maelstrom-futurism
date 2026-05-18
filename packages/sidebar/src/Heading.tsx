import { ReactNode, useContext } from 'react';
import { css } from '@emotion/react';
import { Button } from '@maelstrom-futurism/button';
import { Icon } from '@maelstrom-futurism/icons';

import { SidebarContext } from './SidebarContext';

export interface HeadingProps {
  title: string;
  logo?: ReactNode;
}

const Heading = ({ title, logo }: HeadingProps): ReactNode => {
  const sidebarContext = useContext(SidebarContext);

  const headingStyle = css`
        padding: 0.5rem 1rem;
        ${sidebarContext.isOpen ? `border-bottom: inset 2px var(--mf-border-muted)` : 'border-bottom: none'};

        h2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0;
            font-size: 1rem;
        }
    `;

  const wordmarkStyle = css`
        display: flex;
        align-items: center;
        gap: 10px;

        span {
            font-family: var(--mf-font-display);
            font-weight: 400;
            font-size: 0.8rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
        }
    `;

  const logoMark = logo ? logo : <span>{title}</span>;

  return (
    <div css={headingStyle}>
      <h2>
        <div css={wordmarkStyle}>
          {sidebarContext.isOpen && logoMark}
        </div>

        {sidebarContext.isClosable && (
          <Button variant="ghost" onClick={() => sidebarContext.setIsOpen(!sidebarContext.isOpen)}>
            {sidebarContext.isOpen
              ? (
                  <Icon icon="AngleLeft" />
                )
              : (
                  <Icon icon="MenuBurger" />
                )}
          </Button>
        )}
      </h2>
    </div>
  );
};

Heading.displayName = 'Heading';

export default Heading;
