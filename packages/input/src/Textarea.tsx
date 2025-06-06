import { css } from "@emotion/react";
import { useTheme } from "@maelstrom-futurism/core";
import { normalStyledInput } from "./NormalStyles";

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
    
    return (
        <div css={fcContainer}>
            {label && <label htmlFor={name}>{label}</label>}
            <textarea css={normalStyledInput(theme)} {...rest}></textarea>
        </div>
    );
};

export default TextArea;