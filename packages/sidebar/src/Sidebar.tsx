/**
 * Styling ideas: https://freefrontend.com/css-sidebar-menus/
 *
 * https://cloudscape.design/get-started/integration/global-styles/ <- i like this
 *
 * Sidebar > Item > Item (A sidebar has items and those items have items)
 */

import { CSSProperties, ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import { composeStyles, isSerializedStyles, StyleOverride } from '@maelstrom-futurism/core';

import Heading from './Heading';
import { SidebarContext } from './SidebarContext';

interface SidebarProps {
  name?: string;
  isClosable?: boolean;
  isOpen?: boolean;
  /** Style override targeting the sidebar container. */
  styles?: StyleOverride;
  className?: string;
  children?: ReactNode;
}

const Sidebar = ({
  isClosable = false,
  isOpen = true,
  styles,
  className,
  children,
}: SidebarProps): ReactNode => {
  const [isOpenState, setIsOpenState] = useState(isOpen);

  const openStyle = css`
        overflow-x: hidden;
        overflow-y: auto;
        min-width: 300px;
        width: 25vw;
        max-width: 380px;

        border-right: solid var(--mf-border-width-thin) var(--mf-border-muted);

        @media (max-width: 379px) {
            width: 100%;
        }
    `;

  const closedStyle = css`
        width: 5vw;
        height: 44px;

        ul, hr, a {
            display: none;
        }
    `;

  const sidebarContainer = css`
        position: sticky;

        ul {
            list-style: none;
        }

        hr {
            border: 0;
            border-top: solid var(--mf-border-width-thin) var(--mf-border-muted);
        }

        a {
            color: var(--mf-text);
            text-decoration: none;
        }

        a:hover {
            color: var(--mf-link);
            text-decoration: underline;
        }
    `;

  // Compose all internal layers: base → open/closed state → consumer override
  const internalBase = composeStyles(sidebarContainer, isOpenState ? openStyle : closedStyle);

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(internalBase, styles)
    : internalBase;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  return (
    <aside css={emotionStyle} style={inlineStyle} className={className}>
      <SidebarContext.Provider value={{ isOpen: isOpenState, setIsOpen: setIsOpenState, isClosable }}>
        {children}
      </SidebarContext.Provider>
    </aside>
  );
};

Sidebar.Heading = Heading;

export default Sidebar;
