import { useContext } from "react";
import { css } from "@emotion/react";
import { Button } from "@maelstrom-futurism/button";
import { useTheme } from "@maelstrom-futurism/core";
import { Icon } from "@maelstrom-futurism/icons";

import { SidebarContext } from "./SidebarContext";

export interface HeadingProps {
    title: string;
}

const Heading = ({ title }: HeadingProps): JSX.Element => {
    const theme = useTheme();
    const sidebarContext = useContext(SidebarContext);

    const headingStyle = css`
        padding: 0.5rem 1rem;
        ${sidebarContext.isOpen ? `border-bottom: inset 2px ${theme.color('borderMuted')}` : "border-bottom: none"};

        ${sidebarContext.isOpen && `h2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }`}
    `;

    return (
        <div css={headingStyle}>
            <h2>
                {sidebarContext.isOpen && (<div>{title}</div>)}

                {sidebarContext.isClosable && (
                    <Button variant="ghost" onClick={() => sidebarContext.setIsOpen(!sidebarContext.isOpen)}>
                        {sidebarContext.isOpen ? (
                            <Icon icon="AngleLeft"/>
                        ) : (
                            <Icon icon="MenuBurger"/>
                        )}
                    </Button>
                )}
                 
            </h2>
        </div>
    );
};

Heading.displayName = "Heading";

export default Heading;
