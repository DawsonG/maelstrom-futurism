import { css } from "@emotion/react";
import { useTheme } from "@maelstrom-futurism/core";

interface TextAreaProps extends React.ClassAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    rows?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}



const TextArea = ({ name, label, value, ...rest }: TextAreaProps) => {
    const theme = useTheme();
    
    const fcContainer = css`
        margin-top: 0.5em;
    `;
    
    const textAreaStyles = css`
        border: solid 1px ${theme.color("content")};
        border-radius: ${theme.inputRadius};
        padding: 0.5em 1em;
        width: 100%;
        font-size: 1em;
        color: ${theme.color("textColor")};
        background-color: ${theme.color("content")};
        outline: 1px solid ${theme.color("secondary")};
    `;

    return (
        <div css={fcContainer}>
            {label && <label htmlFor={name}>{label}</label>}
            <textarea css={textAreaStyles} value={value} {...rest} />
        </div>
    );
};

export default TextArea;