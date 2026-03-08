import React from "react";
import { useTheme } from "@maelstrom-futurism/core";

import { materialStyledRadio } from "./styles";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
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
    ({ name, value, label, ...rest }: RadioProps, ref?: any) => {
        const theme = useTheme();
        const id = `${name}-${value}`;

        return (
            <div css={materialStyledRadio(theme)}>
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
