import React, { HTMLInputTypeAttribute } from "react";

import MaterialInput from "./MaterialInput";
import NormalInput from "./NormalInput";

export type Variant =
    | "normal"
    | "material";

export interface InputProps {
    
    /**
     * Normal or Material variant
     */
    variant?: Variant;

    /**
     * A valid HTML5 type. (Required)
     */
    type: HTMLInputTypeAttribute;

    /**
     * A unique (in form) field name (Required)
     */
    name: string;

    /**
     * The label to display above the input.  Leave blank to hide.
     */
    label?: string;

    /**
     * Text to use as a placeholder
     */
    placeholder?: string;

    /**
     * Use textarea?
     */
    multiline?: boolean;

    /**
     * Literal input value for use outside traditional form
     */
    value?: string;

    /**
     * Is this input required? Used by FormValidator
     */
    required?: boolean;

    /**
     * Value used for preloaded state
     */
    defaultValue?: string;

    /**
     * Called whenever the value changes. For use of Inputs outside traditional forms
     */
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;

    forwardedRef?: any;
}

const Input = React.forwardRef(
  ({ variant = "normal", type, name, ...rest }: InputProps, ref?: any) => {
    switch (variant) {
      case "material":
        return (
          <MaterialInput type={type} name={name} forwardedRef={ref} {...rest} />
        );
      case "normal":
      default:
        return <NormalInput type={type} name={name} forwardedRef={ref} {...rest} />;
    }
  }
);

export default Input;