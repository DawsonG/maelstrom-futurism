import React, { CSSProperties, useEffect, useRef } from 'react';
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
import {
  resolveDateBound,
  isDateDisabled,
  snapToBusinessHours,
  type DateBound,
  type DisabledDay,
  type BusinessHours,
} from './dateHelpers';
import { useRangeGroup } from './RangeGroupContext';

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

  /** Earliest allowed date. Pass `"today"` or an ISO date string (`YYYY-MM-DD`). Clears out-of-range values on change. */
  minDate?: DateBound;

  /** Latest allowed date. Pass `"today"` or an ISO date string (`YYYY-MM-DD`). Clears out-of-range values on change. */
  maxDate?: DateBound;

  /**
   * Reject selections matching any of these rules: `"weekends"`, a day name
   * (e.g. `"Monday"`), or an ISO date (`YYYY-MM-DD`). Matching values are cleared on change.
   */
  disabledDays?: DisabledDay[];

  /** For `type="time"`: on blur, snap values outside `{ start, end }` (HH:mm) to the nearest boundary */
  businessHours?: BusinessHours;

  /**
   * Pairs this field with others inside the same `<RangeGroup>`. The `"end"`
   * field's `min` automatically follows the `"start"` field's value.
   */
  rangeGroup?: 'start' | 'end';

  forwardedRef?: React.Ref<HTMLInputElement>;

  /** Style override applied to the outer container. */
  styles?: StyleOverride;

  /** className applied to the outer container */
  className?: string;
}

const mergeRefs = (
  ...refs: Array<React.Ref<HTMLInputElement> | undefined>
) => (node: HTMLInputElement) => {
  refs.forEach((r) => {
    if (!r) return;
    if (typeof r === 'function') r(node);
    else (r as { current: HTMLInputElement | null }).current = node;
  });
};

const DateInput = React.forwardRef(({
  type,
  name,
  label,
  helpText,
  validationState,
  validationMessage,
  minDate,
  maxDate,
  disabledDays,
  businessHours,
  rangeGroup,
  styles,
  className,
  onChange,
  onBlur,
  min,
  max,
  ...rest
}: DateInputProps, ref?: React.Ref<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const group = useRangeGroup();

  const emotionStyle = styles && isSerializedStyles(styles)
    ? composeStyles(outsideContainer, styles)
    : outsideContainer;

  const inlineStyle = styles && !isSerializedStyles(styles)
    ? styles as CSSProperties
    : undefined;

  const resolvedMin = rangeGroup === 'end' && group?.startValue
    ? group.startValue
    : (resolveDateBound(minDate) ?? min);
  const resolvedMax = resolveDateBound(maxDate) ?? max;

  useEffect(() => {
    if (rangeGroup === 'start' && group) {
      group.setStartValue(inputRef.current?.value || undefined);
    }
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (!el || rangeGroup !== 'end' || !resolvedMin || !el.value || el.value >= resolvedMin) return;

    const nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeValueSetter?.call(el, '');
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, [rangeGroup, resolvedMin]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let { value } = e.target;

    if (resolvedMin && value && value < resolvedMin) value = '';
    if (resolvedMax && value && value > resolvedMax) value = '';
    if (isDateDisabled(value, disabledDays)) value = '';

    if (value !== e.target.value) {
      e.target.value = value;
    }

    if (rangeGroup === 'start' && group) {
      group.setStartValue(value || undefined);
    }

    onChange?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (type === 'time' && businessHours) {
      const snapped = snapToBusinessHours(e.target.value, businessHours);
      if (snapped !== e.target.value) {
        const nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        nativeValueSetter?.call(e.target, snapped);
        e.target.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
    onBlur?.(e);
  };

  return (
    <div css={emotionStyle} style={inlineStyle} className={className}>
      <div css={[fcContainer, dateInputStyle, validationState && validationStyle(validationState)]}>
        <input
          id={name}
          name={name}
          type={type}
          ref={mergeRefs(ref, inputRef)}
          placeholder=" "
          min={resolvedMin}
          max={resolvedMax}
          onChange={handleChange}
          onBlur={handleBlur}
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
