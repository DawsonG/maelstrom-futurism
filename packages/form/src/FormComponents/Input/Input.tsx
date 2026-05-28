import React, { CSSProperties, HTMLInputTypeAttribute } from 'react';
import { composeStyles, isSerializedStyles, StyleOverride } from '@maelstrom-futurism/core';

import {
  outsideContainer,
  fcContainer,
  materialStyledInput,
  normalStyledInput,
  helpText as helpTextCss,
  validationStyle,
  validationMessage as validationMessageCss,
  type ValidationState,
} from './styles';
import TextArea from './Textarea';

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

  /** Text to use as a placeholder */
  placeholder?: string;

  /** Literal input value for use outside traditional form */
  value?: string;

  /** Is this input required? Used by FormValidator */
  required?: boolean;

  /** Value used for preloaded state */
  defaultValue?: string;

  /** Use textarea? */
  multiline?: boolean;

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
}

const Input = React.forwardRef(({
  variant = 'normal',
  type,
  name,
  label,
  helpText,
  multiline,
  validationState,
  validationMessage,
  styles,
  className,
  ...rest
}: InputProps, ref?: React.Ref<HTMLInputElement>) => {
  if (multiline) {
    return (
      <TextArea
        name={name}
        label={label || ''}
        validationState={validationState}
        validationMessage={validationMessage}
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

  return (
    <div css={emotionStyle} style={inlineStyle} className={className}>
      <div css={[fcContainer, additionalStyles, validationState && validationStyle(validationState, variant)]}>
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder=" "
          {...rest}
        />
        {label && <label htmlFor={name}>{label}</label>}
        {isMaterial && <span className="underline" />}
      </div>
      {validationMessage && validationState && (
        <span css={validationMessageCss(validationState)}>{validationMessage}</span>
      )}
      {helpText && !validationMessage && (
        <span css={helpTextCss}>{helpText}</span>
      )}
    </div>
  );
});

export default Input;
