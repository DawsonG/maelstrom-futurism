/**
 * Styling ideas: https://freefrontend.com/css-sidebar-menus/
 * 
 * https://cloudscape.design/get-started/integration/global-styles/ <- i like this
 *
 * Sidebar > Item > Item (A sidebar has items and those items have items) 
 */

import { ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import { useTheme } from '@maelstrom-futurism/core';

import Heading from './Heading';
import { SidebarContext } from './SidebarContext';

interface SidebarProps {
    name?: string; // the title at the top of the sidebar
    isClosable?: boolean;
    isOpen?: boolean;
    children?: ReactNode;
}

const Sidebar = ({
    isClosable = false,
    isOpen = true,
    children
}: SidebarProps): JSX.Element => {
    const theme = useTheme();
    const [isOpenState, setIsOpenState] = useState(isOpen);
    
    const openStyle = css`
        overflow-x: hidden;
        overflow-y: auto;
        min-width: 300px;
        max-width: 100%;

        border-right: solid 1px ${theme.color('borderMuted')};
    `;

    const closedStyle = css`
        width: 65px;
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
            border-top: solid 1px ${theme.color('borderMuted')};
        }

        a {
            color: ${theme.color('textColor')};
            text-decoration: none;
        }

        a:hover {
            color: ${theme.color('linkColor')};
            text-decoration: underline;
        }
    `;    

    return (
        <aside css={[sidebarContainer, isOpenState ? openStyle : closedStyle]}>
            <SidebarContext.Provider value={{ isOpen: isOpenState, setIsOpen: setIsOpenState, isClosable }}>
                {children}
            </SidebarContext.Provider>
        </aside>
    );
};

Sidebar.Heading = Heading;

export default Sidebar;