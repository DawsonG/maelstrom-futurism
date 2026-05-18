import React from "react";

import { radioGroupContainer, groupLabel, helpText as helpTextCss, optionsContainer } from "./styles";
import Radio from "./Radio";


export interface RadioOption {
    /** The value submitted with the form */
    value: string;

    /** The label displayed next to the radio button */
    label: string;

    /** Whether this option is disabled */
    disabled?: boolean;
}

export interface RadioGroupProps {
    /**
     * A unique field name shared by all radio buttons in the group (Required)
     */
    name: string;

    /**
     * The label displayed above the group
     */
    label?: string;

    /**
     * Help text displayed below the group
     */
    helpText?: string;

    /**
     * Array of radio options to render
     */
    options: RadioOption[];

    /**
     * The currently selected value (controlled)
     */
    value?: string;

    /**
     * The initially selected value (uncontrolled)
     */
    defaultValue?: string;

    /**
     * Called when the selected value changes
     */
    onChange?: (value: string) => void;

    /**
     * Is this field required? Used by FormValidator
     */
    required?: boolean;
}

const RadioGroup = ({
    name,
    label,
    helpText,
    options,
    value,
    defaultValue,
    onChange,
    required,
}: RadioGroupProps) => {
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange((e.target as HTMLInputElement).value);
        }
    };

    return (
        <div css={radioGroupContainer}>
            {label && (
                <span css={groupLabel}>
                    {label}
                    {required && " *"}
                </span>
            )}
            <div css={optionsContainer}>
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        name={name}
                        value={option.value}
                        label={option.label}
                        disabled={option.disabled}
                        checked={value !== undefined ? value === option.value : undefined}
                        defaultChecked={value === undefined && defaultValue !== undefined ? defaultValue === option.value : undefined}
                        onChange={handleChange}
                    />
                ))}
            </div>
            {helpText && <span css={helpTextCss}>{helpText}</span>}
        </div>
    );
};

export default RadioGroup;
