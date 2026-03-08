import React from "react";
import { useTheme } from "@maelstrom-futurism/core";

import { normalStyledRadio, materialStyledRadio } from "./styles";
import type { Variant } from "./RadioGroup";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    /**
     * Normal or Material variant
     */
    variant?: Variant;

    /**
     * A unique (in form) field name (Required)
     */
    name: string;

    /**
     * The value this radio option represents (Required)
     */
    value: string;

    /**
     * The label to display next to the radio button
     */
    label?: string;

    /**
     * Whether this radio option is selected
     */
    checked?: boolean;

    /**
     * Whether this radio option is selected by default (uncontrolled)
     */
    defaultChecked?: boolean;

    /**
     * Called when this radio option is selected
     */
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Radio = React.forwardRef(
    ({ variant = "normal", name, value, label, ...rest }: RadioProps, ref?: any) => {
        const theme = useTheme();
        const isMaterial = variant === "material";
        const optionStyles = isMaterial ? materialStyledRadio(theme) : normalStyledRadio(theme);
        const id = `${name}-${value}`;

        return (
            <div css={optionStyles}>
                <input
                    id={id}
                    type="radio"
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

export default Radio;
