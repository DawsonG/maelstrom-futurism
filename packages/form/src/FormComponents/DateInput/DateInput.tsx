import React, { CSSProperties } from 'react';
import { composeStyles, isSerializedStyles, StyleOverride } from '@maelstrom-futurism/core';

import {
  outsideContainer,
  fcContainer,
  dateInputStyle,
  helpText as helpTextCss,
  validationStyle,
  validationMessage as validationMessageCss,
  type ValidationState,
} from './styles';

export interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'placeholder'> {
  /** 'date' or 'time' input (Required) */
  type: 'date' | 'time';

  /** A unique (in form) field name (Required) */
  name: string;

  /** The label to display above the input. Leave blank to hide. */
  label?: string;

  /** Help text displayed below the field */
  helpText?: string;

  /** Validation state: error, warning, or success */
  validationState?: ValidationState;

  /** Message displayed below the field when a validationState is set */
  validationMessage?: string;

  forwardedRef?: React.Ref<HTMLInputElement>;

  /** Style override applied to the outer container. */
  styles?: StyleOverride;

  /** className applied to the outer container */
  className?: string;
}

const DateInput = React.forwardRef(({
  type,
  name,
  label,
  helpText,
  validationState,
  validationMessage,
  styles,
  className,
  ...rest
}: DateInputProps, ref?: React.Ref<HTMLInputElement>) => {
  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(outsideContainer, styles)
    : outsideContainer;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  return (
    <div css={emotionStyle} style={inlineStyle} className={className}>
      <div css={[fcContainer, dateInputStyle, validationState && validationStyle(validationState)]}>
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder=" "
          {...rest}
        />
        {label && <label htmlFor={name}>{label}</label>}
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

export default DateInput;
