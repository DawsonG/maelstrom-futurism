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
  leadingIconStyle,
  suffixIconStyle,
  leadingIconSlot,
  suffixIconSlot,
  suffixButton,
  characterCount as characterCountCss,
  materialStyledInput,
  normalStyledInput,
  helpText as helpTextCss,
  validationStyle,
  validationMessage as validationMessageCss,
  type ValidationState,
} from './styles';
import TextArea from './Textarea';
import {
  applyCustomValidity,
  applyAllowedDomains,
  applyMask,
  DEFAULT_TEL_MASK,
  type ErrorMessages,
} from './validation';

const mergeRefs = (
  ...refs: Array<React.Ref<HTMLInputElement> | undefined>
) => (node: HTMLInputElement) => {
  refs.forEach((r) => {
    if (!r) return;
    if (typeof r === 'function') r(node);
    else (r as { current: HTMLInputElement | null }).current = node;
  });
};

const hasProtocol = (v: string) => /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(v);
const isTypingProtocol = (v: string) => 'https://'.startsWith(v.toLowerCase()) || 'http://'.startsWith(v.toLowerCase());

const withUrlPrefix = (v: string): string => {
  if (!v || hasProtocol(v) || isTypingProtocol(v)) return v;
  return `https://${v}`;
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

  /** Content rendered at the start of the field, e.g. an icon or symbol */
  leadingIcon?: React.ReactNode;

  /**
   * Content rendered at the end of the field, e.g. an icon or symbol.
   * For `type="password"`, a built-in show/hide toggle is used automatically
   * when this is not provided.
   */
  suffixIcon?: React.ReactNode;

  /** Validation state: error, warning, or success */
  validationState?: ValidationState;

  /** Message displayed below the field when a validationState is set */
  validationMessage?: string;

  /**
   * Custom messages for native validation failures, keyed by `ValidityState` flag
   * (e.g. `valueMissing`, `typeMismatch`, `tooShort`). Applied via `setCustomValidity()`.
   */
  errorMessages?: ErrorMessages;

  /**
   * Restrict `type="email"`/`type="url"` values to the given hostnames (subdomains allowed).
   * Sets a custom validity message when the value's host doesn't match.
   */
  allowedDomains?: string[];

  /** Message shown when the value's host isn't in `allowedDomains` */
  allowedDomainsMessage?: string;

  /**
   * Format the raw digits typed into the field against a mask pattern, where `0`
   * marks a digit placeholder (e.g. `"(000) 000-0000"`). Defaults to a US phone
   * mask for `type="tel"`.
   */
  mask?: string;

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
  leadingIcon,
  suffixIcon,
  validationState,
  validationMessage,
  errorMessages,
  allowedDomains,
  allowedDomainsMessage = 'This domain is not allowed',
  mask,
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
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (needsValueTracking && value !== undefined) setInternalValue(value);
  }, [needsValueTracking, value]);

  const runValidation = (el: HTMLInputElement) => {
    const hasCustomError = applyCustomValidity(el, errorMessages);
    if (!hasCustomError) applyAllowedDomains(el, type, allowedDomains, allowedDomainsMessage);
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) runValidation(input);
  }, [errorMessages, allowedDomains, allowedDomainsMessage, type]);

  if (multiline) {
    return (
      <TextArea
        name={name}
        label={label || ''}
        fullWidth={fullWidth}
        showCharacterCount={showCharacterCount}
        validationState={validationState}
        validationMessage={validationMessage}
        errorMessages={errorMessages}
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

  const effectiveMask = mask ?? (type === 'tel' ? DEFAULT_TEL_MASK : undefined);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (type === 'url') {
      const prefixed = withUrlPrefix(e.target.value);
      if (prefixed !== e.target.value) e.target.value = prefixed;
    }
    if (effectiveMask) {
      const masked = applyMask(e.target.value, effectiveMask);
      if (masked !== e.target.value) e.target.value = masked;
    }
    runValidation(e.target);
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

  const isPassword = type === 'password';
  const effectiveType = isPassword && passwordVisible ? 'text' : type;
  const resolvedSuffixIcon = suffixIcon ?? (isPassword && (
    <button
      type="button"
      css={suffixButton}
      aria-label={passwordVisible ? 'Hide password' : 'Show password'}
      onClick={() => setPasswordVisible((v) => !v)}
    >
      <span aria-hidden="true">{passwordVisible ? '🙈' : '👁'}</span>
    </button>
  ));

  return (
    <div css={[emotionStyle, fullWidth && fullWidthStyle]} style={inlineStyle} className={className}>
      <div
        css={[
          fcContainer,
          additionalStyles,
          clearable && clearableInputStyle,
          !!leadingIcon && leadingIconStyle,
          !!resolvedSuffixIcon && suffixIconStyle,
          validationState && validationStyle(validationState, variant),
        ]}
      >
        {leadingIcon && <span css={leadingIconSlot} aria-hidden="true">{leadingIcon}</span>}
        <input
          id={name}
          name={name}
          type={effectiveType}
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
        {(resolvedSuffixIcon || (clearable && !!internalValue)) && (
          <span css={suffixIconSlot}>
            {clearable && !!internalValue && (
              <button type="button" css={clearButton} aria-label="Clear" onClick={handleClear}>
                <span aria-hidden="true">&times;</span>
              </button>
            )}
            {resolvedSuffixIcon}
          </span>
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
