import { ReactNode } from "react";
import { css } from "@emotion/react";
import { Theme } from "@maelstrom-futurism/core";

const linkButtonStyles = css`
    border: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
`;

interface LinkButtonProps {
    theme: Theme;
    children?: ReactNode;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}

const LinkButton = ({
    theme,
    children,
    onClick,
    disabled,
}: LinkButtonProps): JSX.Element => {
    return <button
        onClick={onClick}
        disabled={disabled}
        css={[linkButtonStyles, css`color: ${theme.color("textColor")}`]}>{children}</button>;
}

export default LinkButton;