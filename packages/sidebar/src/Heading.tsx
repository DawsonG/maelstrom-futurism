import { css } from "@emotion/react";
import { useTheme } from "@maelstrom-futurism/core";

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
            <h2>{title}</h2>
        </div>
    );
};

export default Heading;