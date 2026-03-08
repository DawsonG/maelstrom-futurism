import React from "react";
import { useTheme } from "@maelstrom-futurism/core";

import { checkboxGroupContainer, groupLabel, helpText as helpTextCss, optionsContainer } from "./styles";
import Checkbox from "./Checkbox";
import type { Variant } from "./Checkbox";

export interface CheckboxOption {
    /** The value submitted with the form */
    value: string;

    /** The label displayed next to the checkbox */
    label: string;

    /** Whether this option is disabled */
    disabled?: boolean;
}

export interface CheckboxGroupProps {
    /**
     * Normal or Material variant
     */
    variant?: Variant;

    /**
     * A unique field name for the group (Required)
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
     * Array of checkbox options to render
     */
    options: CheckboxOption[];

    /**
     * The currently checked values (controlled)
     */
    value?: string[];

    /**
     * The initially checked values (uncontrolled)
     */
    defaultValue?: string[];

    /**
     * Called when the set of checked values changes
     */
    onChange?: (values: string[]) => void;

    /**
     * Is at least one selection required? Used by FormValidator
     */
    required?: boolean;
}

const CheckboxGroup = ({
    variant = "normal",
    name,
    label,
    helpText,
    options,
    value,
    defaultValue,
    onChange,
    required,
}: CheckboxGroupProps) => {
    const theme = useTheme();

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (!onChange || !value) return;
        const target = e.target as HTMLInputElement;
        const next = target.checked
            ? [...value, target.value]
            : value.filter((v) => v !== target.value);
        onChange(next);
    };

    return (
        <div css={checkboxGroupContainer}>
            {label && (
                <span css={groupLabel(theme)}>
                    {label}
                    {required && " *"}
                </span>
            )}
            <div css={optionsContainer}>
                {options.map((option) => (
                    <Checkbox
                        key={option.value}
                        variant={variant}
                        name={name}
                        value={option.value}
                        label={option.label}
                        disabled={option.disabled}
                        checked={value !== undefined ? value.includes(option.value) : undefined}
                        defaultChecked={
                            value === undefined && defaultValue !== undefined
                                ? defaultValue.includes(option.value)
                                : undefined
                        }
                        onChange={handleChange}
                    />
                ))}
            </div>
            {helpText && <span css={helpTextCss}>{helpText}</span>}
        </div>
    );
};

export default CheckboxGroup;
