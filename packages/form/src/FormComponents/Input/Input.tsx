import React, {
  CSSProperties, HTMLInputTypeAttribute, useEffect, useRef, useState,
} from 'react';
import { composeStyles, isSerializedStyles, StyleOverride } from '@maelstrom-futurism/core';

import {
  outsideContainer,
  fcContainer,
  fullWidthStyle,
  clearableInputStyle,
  clearButton,
  characterCount as characterCountCss,
  materialStyledInput,
  normalStyledInput,
  helpText as helpTextCss,
  validationStyle,
  validationMessage as validationMessageCss,
  type ValidationState,
} from './styles';
import TextArea from './Textarea';

const mergeRefs = (
  ...refs: Array<React.Ref<HTMLInputElement> | undefined>
) => (node: HTMLInputElement) => {
  refs.forEach((r) => {
    if (!r) return;
    if (typeof r === 'function') r(node);
    else (r as { current: HTMLInputElement | null }).current = node;
  });
};

export type Variant = 'normal' | 'material';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Normal or Material variant */
  variant?: Variant;

  /** A valid HTML5 type. (Required) */
  type: HTMLInputTypeAttribute;

  /** A unique (in form) field name (Required) */
  name: string;

  /** The label to display above the input. Leave blank to hide. */
  label?: string;

  /** Help text displayed below the field */
  helpText?: string;

  /** Literal input value for use outside traditional form */
  value?: string;

  /** Is this input required? Used by FormValidator */
  required?: boolean;

  /** Value used for preloaded state */
  defaultValue?: string;

  /** Use textarea? */
  multiline?: boolean;

  /** Stretch the input to fill the width of its container */
  fullWidth?: boolean;

  /** Render a trailing clear (×) button that empties the field when it has a value */
  clearable?: boolean;

  /** Show a `n/maxLength` character count label below the field. Requires `maxLength`. */
  showCharacterCount?: boolean;

  /** Select the field's full text on focus. Only active when `readOnly` is set. */
  autoSelectOnFocus?: boolean;

  /** Validation state: error, warning, or success */
  validationState?: ValidationState;

  /** Message displayed below the field when a validationState is set */
  validationMessage?: string;

  /** Called whenever the value changes. For use of Inputs outside traditional forms. */
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  forwardedRef?: React.Ref<HTMLInputElement>;

  /** Style override applied to the outer container. */
  styles?: StyleOverride;

  /** className applied to the outer container */
  className?: string;

  /** turn off attributes that clash with internal style rules */
  placeholder?: never;
}

const Input = React.forwardRef(({
  variant = 'normal',
  type,
  name,
  label,
  helpText,
  multiline,
  fullWidth,
  clearable,
  showCharacterCount,
  autoSelectOnFocus,
  validationState,
  validationMessage,
  styles,
  className,
  value,
  defaultValue,
  onChange,
  onFocus,
  maxLength,
  readOnly,
  ...rest
}: InputProps, ref?: React.Ref<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const needsValueTracking = clearable || showCharacterCount;
  const [internalValue, setInternalValue] = useState(() => value ?? defaultValue ?? '');

  useEffect(() => {
    if (needsValueTracking && value !== undefined) setInternalValue(value);
  }, [needsValueTracking, value]);

  if (multiline) {
    return (
      <TextArea
        name={name}
        label={label || ''}
        fullWidth={fullWidth}
        showCharacterCount={showCharacterCount}
        validationState={validationState}
        validationMessage={validationMessage}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={onFocus as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
        maxLength={maxLength}
        readOnly={readOnly}
        {...rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
      />
    );
  }

  const isMaterial = variant === 'material';
  const additionalStyles = isMaterial ? materialStyledInput : normalStyledInput;

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(outsideContainer, styles)
    : outsideContainer;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (needsValueTracking) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (autoSelectOnFocus && readOnly) e.target.select();
    onFocus?.(e);
  };

  const handleClear = () => {
    const input = inputRef.current;
    if (!input) return;

    const nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeValueSetter?.call(input, '');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  };

  return (
    <div css={[emotionStyle, fullWidth && fullWidthStyle]} style={inlineStyle} className={className}>
      <div css={[fcContainer, additionalStyles, clearable && clearableInputStyle, validationState && validationStyle(validationState, variant)]}>
        <input
          id={name}
          name={name}
          type={type}
          ref={mergeRefs(ref, inputRef)}
          placeholder=" "
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          maxLength={maxLength}
          readOnly={readOnly}
          {...rest}
        />
        {label && <label htmlFor={name}>{label}</label>}
        {isMaterial && <span className="underline" />}
        {clearable && !!internalValue && (
          <button type="button" css={clearButton} aria-label="Clear" onClick={handleClear}>
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
      {validationMessage && validationState && (
        <span css={validationMessageCss(validationState)}>{validationMessage}</span>
      )}
      {helpText && !validationMessage && (
        <span css={helpTextCss}>{helpText}</span>
      )}
      {showCharacterCount && typeof maxLength === 'number' && (
        <span css={characterCountCss}>{`${internalValue.length}/${maxLength}`}</span>
      )}
    </div>
  );
});

export default Input;
