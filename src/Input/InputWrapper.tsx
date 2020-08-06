import React from "react";

import Input from "./Input";
import MaterialInput from "./MaterialInput";

export type Variant =
  | "normal"
  | "normal:hidden"
  | "material"
  | "material:hidden";

interface InputWrapper {
  variant?: Variant;
  /**
   * A valid HTML5 type. (Required)
   */
  type: string;

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
   * required to submit form
   */
  required?: boolean;

  /**
   * For use of Inputs outside traditional forms
   */
  value?: string;

  /**
   * Called whenever the value changes. For use of Inputs outside traditional forms
   */
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;

  /**
   * explicitly pass down ref
   */
  ref?: (node: any) => any;
}

const InputWrapper = React.forwardRef(
  ({ variant = "normal", type, name, ...rest }: InputWrapper, ref?: any) => {
    switch (variant) {
      case "normal":
        return <Input type={type} name={name} forwardedRef={ref} {...rest} />;
      case "material":
        return (
          <MaterialInput type={type} name={name} forwardedRef={ref} {...rest} />
        );
    }
  }
);

export default InputWrapper;
