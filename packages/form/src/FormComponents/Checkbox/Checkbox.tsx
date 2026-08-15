import React, { useState } from 'react';

import { materialStyledCheckbox, switchStyledCheckbox } from './styles';

export type CheckboxVariant = 'default' | 'switch';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
     * A unique (in form) field name (Required)
     */
  name: string;

  /**
     * The label to display next to the checkbox
     */
  label?: string;

  /**
     * The value submitted with the form when checked
     */
  value?: string;

  /**
     * Whether the checkbox is checked (controlled)
     */
  checked?: boolean;

  /**
     * Whether the checkbox is checked by default (uncontrolled)
     */
  defaultChecked?: boolean;

  /**
     * Called when the checked state changes
     */
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;

  /**
     * 'default' renders the standard material-style checkbox; 'switch'
     * renders a pill-shaped track+thumb toggle with `role="switch"`.
     */
  variant?: CheckboxVariant;
}

const Checkbox = React.forwardRef(
  ({
    name, label, value, variant = 'default', checked, defaultChecked, onChange, ...rest
  }: CheckboxProps, ref?: React.Ref<HTMLInputElement>) => {
    const id = value ? `${name}-${value}` : name;
    const isSwitch = variant === 'switch';
    const isControlled = checked !== undefined;

    const [uncontrolledChecked, setUncontrolledChecked] = useState(!!defaultChecked);
    const ariaChecked = isControlled ? checked : uncontrolledChecked;

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      if (!isControlled) setUncontrolledChecked(e.currentTarget.checked);
      onChange?.(e);
    };

    return (
      <div css={isSwitch ? switchStyledCheckbox : materialStyledCheckbox}>
        <input
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          ref={ref}
          role={isSwitch ? 'switch' : undefined}
          aria-checked={isSwitch ? ariaChecked : undefined}
          {...rest}
        />
        {label && <label htmlFor={id}>{label}</label>}
      </div>
    );
  },
);

export default Checkbox;
