import { css } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';

import { validationStyle, validationMessage as validationMessageCss, type ValidationState } from './styles';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  validationState?: ValidationState;
  validationMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const containerCss = css`
    margin-top: 0.5em;

    label {
        color: var(--mf-text-muted);
    }

    &:focus-within label {
        color: var(--mf-focus);
    }
`;

const textAreaStyles = css`
    border: solid 1px var(--mf-content);
    border-radius: var(--mf-radius-input);
    padding: 0.5em 1em;
    width: 100%;
    font-size: 1em;
    color: var(--mf-text);
    background-color: var(--mf-content);
    outline: 1px solid var(--mf-secondary);
    transition: outline-color var(--mf-dur-fast) ${EASE_FUNCTION};

    &:hover {
        outline-color: var(--mf-text);
    }

    &:focus {
        outline-color: var(--mf-focus);
    }
`;

const TextArea = ({ name, label, value, validationState, validationMessage, ...rest }: TextAreaProps) => {
  return (
    <div css={[containerCss, validationState && validationStyle(validationState, 'normal')]}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea id={name} css={textAreaStyles} value={value} {...rest} />
      {validationMessage && validationState && (
        <span css={validationMessageCss(validationState)}>{validationMessage}</span>
      )}
    </div>
  );
};

export default TextArea;
