/**
 * This is an opinionated layout component for Maelstrom Futurism.  It
 * assumes the page has a navigation bar at the top and a sidebar on the left.
 */
import React, { ReactNode } from 'react';
import { css } from '@emotion/react';

const pageLayoutStyle = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const contentStyle = css`
    display: flex;
    width: 100vw;
    height: calc(100vh - 60px);
`;

interface PageLayoutProps {
    navbar?: React.ReactNode;
    sidebar?: React.ReactNode;
    children: React.ReactNode;
}

const PageLayout = ({
    navbar,
    sidebar,
    children,
}: PageLayoutProps): ReactNode => {

    return (
        <div css={pageLayoutStyle} data-testid="page-layout">
            {navbar}

            <div css={contentStyle}>
                {sidebar}
                
                {children}
            </div>
        </div>
    );
};

export default PageLayout;