import React from "react";
import { useTheme } from "@maelstrom-futurism/core";

import { normalStyledCheckbox, materialStyledCheckbox } from "./styles";

export type Variant = "normal" | "material";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    /**
     * Normal or Material variant
     */
    variant?: Variant;

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
}

const Checkbox = React.forwardRef(
    ({ variant = "normal", name, label, value, ...rest }: CheckboxProps, ref?: any) => {
        const theme = useTheme();
        const isMaterial = variant === "material";
        const optionStyles = isMaterial ? materialStyledCheckbox(theme) : normalStyledCheckbox(theme);
        const id = value ? `${name}-${value}` : name;

        return (
            <div css={optionStyles}>
                <input
                    id={id}
                    type="checkbox"
                    name={name}
                    value={value}
                    ref={ref}
                    {...rest}
                />
                {label && <label htmlFor={id}>{label}</label>}
            </div>
        );
    }
);

export default Checkbox;
