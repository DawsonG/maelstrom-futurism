import Heading from './Heading';
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

interface SidebarProps {
    name?: string; // the title at the top of the sidebar
    isClosable?: boolean;
    isOpen?: boolean;
    children?: ReactNode;
}

const Sidebar = ({
    name,
    isClosable = true,
    isOpen = true,
    children
}: SidebarProps): JSX.Element => {
    const theme = useTheme();
    const [isOpenState, setIsOpenState] = useState(isOpen);
    
    const sidebarContainer = css`
        min-width: 300px;
        max-width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        position: sticky;
        border-right: solid 1px ${theme.color('borderMuted')};

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
        <aside css={sidebarContainer}>
            {children}
        </aside>
    );
};

Sidebar.Heading = Heading;

export default Sidebar;