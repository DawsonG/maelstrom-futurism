import { css } from "@emotion/react";
import { useTheme } from "@maelstrom-futurism/core";

import { validationStyle, validationMessage as validationMessageCss, type ValidationState } from "./styles";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label?: string;
    validationState?: ValidationState;
    validationMessage?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const TextArea = ({ name, label, value, validationState, validationMessage, ...rest }: TextAreaProps) => {
    const theme = useTheme();

    const containerCss = css`
        margin-top: 0.5em;

        label {
            color: ${theme.color("focus")};
        }
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
        <div css={[containerCss, validationState && validationStyle(theme, validationState, 'normal')]}>
            {label && <label htmlFor={name}>{label}</label>}
            <textarea id={name} css={textAreaStyles} value={value} {...rest} />
            {validationMessage && validationState && (
                <span css={validationMessageCss(theme, validationState)}>{validationMessage}</span>
            )}
        </div>
    );
};

export default TextArea;
