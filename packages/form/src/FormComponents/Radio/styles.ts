import { css } from '@emotion/react';
import { Theme } from '@maelstrom-futurism/core';

const EASE_FUNCTION = 'cubic-bezier(.65, .05, .36, 1)';

export const radioGroupContainer = css`
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

export const materialStyledRadio = (theme: Theme) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    padding: 4px 0;
    border-bottom: 1px solid transparent;
    transition: border-color .2s ${EASE_FUNCTION};

    input[type="radio"] {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid ${theme.color("secondary")};
        border-radius: 50%;
        position: relative;
        cursor: pointer;
        flex-shrink: 0;
        transition: border-color .2s ${EASE_FUNCTION};
        background: transparent;
        outline: none;
    }

    input[type="radio"]::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${theme.color("secondary")};
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform .2s ${EASE_FUNCTION}, background .2s ${EASE_FUNCTION};
    }

    input[type="radio"]:checked {
        border-color: ${theme.color("primary")};
    }

    input[type="radio"]:checked::after {
        background: ${theme.color("primary")};
        transform: translate(-50%, -50%) scale(1);
    }

    input[type="radio"]:hover {
        border-color: ${theme.color("textColor")};
    }

    input[type="radio"]:focus {
        border-color: ${theme.color("primary")};
    }

    input[type="radio"]:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    label {
        font-size: ${theme.size("base")};
        color: ${theme.color("textColor")};
        cursor: pointer;
        transition: color .2s ${EASE_FUNCTION};
    }

    &:has(input[type="radio"]:checked) label {
        color: ${theme.color("primary")};
    }

    input[type="radio"]:disabled ~ label {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;
