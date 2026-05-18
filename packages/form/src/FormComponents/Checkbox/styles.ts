import { css } from '@emotion/react';
import { Theme } from '@maelstrom-futurism/core';

const EASE_FUNCTION = 'cubic-bezier(.65, .05, .36, 1)';

export const checkboxGroupContainer = css`
    background-color: inherit;
    margin-top: 14px;
`;

export const groupLabel = (theme: Theme) => css`
    display: block;
    font-size: 1rem;
    color: ${theme.color("textColor")}80;
    margin-bottom: 8px;
`;

export const helpText = css`
    position: relative;
    display: block;
    padding: 2px 0 2px 12px;
    font-size: 0.9em;
    opacity: 0.7;
`;

export const optionsContainer = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const materialStyledCheckbox = (theme: Theme) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    padding: 4px 0;
    border-bottom: 1px solid transparent;
    transition: border-color var(--mf-dur-normal) ${EASE_FUNCTION};

    input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid ${theme.color("secondary")};
        border-radius: 3px;
        position: relative;
        cursor: pointer;
        flex-shrink: 0;
        transition: border-color var(--mf-dur-normal) ${EASE_FUNCTION}, background var(--mf-dur-normal) ${EASE_FUNCTION};
        background: transparent;
    }

    input[type="checkbox"]::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 1px;
        width: 5px;
        height: 9px;
        border: 2px solid ${theme.color("content")};
        border-top: none;
        border-left: none;
        transform: rotate(45deg) scale(0);
        transition: transform var(--mf-dur-normal) ${EASE_FUNCTION};
    }

    input[type="checkbox"]:checked {
        background: ${theme.color("active")};
        border-color: ${theme.color("active")};
    }

    input[type="checkbox"]:checked::after {
        transform: rotate(45deg) scale(1);
    }

    input[type="checkbox"]:hover {
        border-color: ${theme.color("textColor")};
    }

    input[type="checkbox"]:focus-visible {
        outline: 2px solid ${theme.color("focus")};
        outline-offset: 2px;
        border-color: ${theme.color("focus")};
    }

    input[type="checkbox"]:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    label {
        font-size: ${theme.size("base")};
        color: ${theme.color("textColor")};
        cursor: pointer;
        transition: color var(--mf-dur-normal) ${EASE_FUNCTION};
    }

    &:has(input[type="checkbox"]:checked) label {
        color: ${theme.color("active")};
    }

    input[type="checkbox"]:disabled ~ label {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;
