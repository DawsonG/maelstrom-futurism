import { css } from "@emotion/react";
import Button from "@maelstrom-futurism/button";
import { useTheme } from "@maelstrom-futurism/core";
import { Icon } from "@maelstrom-futurism/icons";

export interface HeadingProps {
    title: string;
}

const Heading = ({ title }: HeadingProps): JSX.Element => {
    const theme = useTheme();

    const headingStyle = css`
        padding: 0.5rem 1rem;
        border-bottom: inset 2px ${theme.color('borderMuted')};
    `;

    return (
        <div css={headingStyle}>
            <h2>
                {title}
                <Button variant="ghost">
                    <Icon icon="AngleLeft"/>
                </Button>    
            </h2>
        </div>
    );
};

export default Heading;