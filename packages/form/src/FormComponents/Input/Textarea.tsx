import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';

import {
  validationStyle,
  validationMessage as validationMessageCss,
  fullWidthStyle,
  characterCount as characterCountCss,
  type ValidationState,
} from './styles';
import { applyCustomValidity, type ErrorMessages } from './validation';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  validationState?: ValidationState;
  validationMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /** Grow the textarea to fit its content instead of scrolling */
  autosize?: boolean;

  /** Stretch the textarea to fill the width of its container */
  fullWidth?: boolean;

  /** Show a `n/maxLength` character count label below the field. Requires `maxLength`. */
  showCharacterCount?: boolean;

  /** Submit the enclosing form on Ctrl/Cmd+Enter */
  submitOnEnter?: boolean;

  /**
   * Custom messages for native validation failures, keyed by `ValidityState` flag
   * (e.g. `valueMissing`, `tooLong`, `tooShort`). Applied via `setCustomValidity()`.
   */
  errorMessages?: ErrorMessages;
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

const TextArea = ({
  name,
  label,
  value,
  defaultValue,
  onChange,
  maxLength,
  validationState,
  validationMessage,
  autosize,
  fullWidth,
  showCharacterCount,
  submitOnEnter,
  errorMessages,
  onKeyDown,
  ...rest
}: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState(() => (value ?? defaultValue ?? '') as string);

  useEffect(() => {
    if (showCharacterCount && value !== undefined) setInternalValue(value as string);
  }, [showCharacterCount, value]);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) applyCustomValidity(el, errorMessages);
  }, [errorMessages]);

  useEffect(() => {
    if (!autosize || !textareaRef.current) return;

    const el = textareaRef.current;
    el.style.height = 'auto'; // reset measurement
    el.style.height = `${el.scrollHeight}px`; // apply measurement
  }, [autosize, value]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    applyCustomValidity(e.target, errorMessages);
    if (showCharacterCount) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (submitOnEnter && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.currentTarget.form?.requestSubmit();
    }
    onKeyDown?.(e);
  };

  return (
    <div css={[containerCss, fullWidth && fullWidthStyle, validationState && validationStyle(validationState, 'normal')]}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        ref={textareaRef}
        css={textAreaStyles}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        {...rest}
      />
      {validationMessage && validationState && (
        <span css={validationMessageCss(validationState)}>{validationMessage}</span>
      )}
      {showCharacterCount && typeof maxLength === 'number' && (
        <span css={characterCountCss}>{`${internalValue.length}/${maxLength}`}</span>
      )}
    </div>
  );
};

export default TextArea;
