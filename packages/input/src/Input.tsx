import React, { HTMLInputTypeAttribute } from "react";
import { useTheme } from "@maelstrom-futurism/core";

import { fcContainer, materialStyledInput, normalStyledInput } from "./styles";


export type Variant =
    | "normal"
    | "material";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    
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

const Input = React.forwardRef(({ variant = "normal", type, name, label, ...rest }: InputProps, ref?: any) => {
    const theme = useTheme();
    const isMaterial = variant === "material";
    
    const additionalStyles = isMaterial ? materialStyledInput(theme) : normalStyledInput(theme)

    return (
      <div css={[fcContainer, additionalStyles]}>
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
    );
});



export default Input;