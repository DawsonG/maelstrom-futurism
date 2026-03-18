import { css } from '@emotion/react';
import { Theme } from '@maelstrom-futurism/core';
import { Variant } from './Input';

const EASE_FUNCTION = 'cubic-bezier(.65, .05, .36, 1)';

export const outsideContainer = css`
    background-color: inherit;
`;

export const fcContainer = css`
    position: relative;
    margin-top: 14px;
`;

export const helpText = css`
    position: relative;
    display: block;
    padding: 2px 0 2px 12px;
    font-size: 0.9em;
    opacity: 0.7;
`;

export type ValidationState = 'error' | 'warning' | 'success';

export const validationStyle = (theme: Theme, state: ValidationState, variant: Variant) => {
    const color = state === 'error'
        ? theme.color('alert')
        : state === 'warning'
            ? theme.color('warning')
            : theme.color('success');

    let line = '';
    if (variant === 'normal') {
        line = `outline: 1px solid ${color}`;
    } else {
        line = `border-bottom: solid 2px ${color}`;
    }
    
    
    return css`
        input, textarea {
            ${line};
        }
        input:focus, textarea:focus {
            ${line};
        }
        input:hover, textarea:hover {
            ${line};
        }
    `;
};

export const validationMessage = (theme: Theme, state: ValidationState) => {
    const color = state === 'error'
        ? theme.color('alert')
        : state === 'warning'
            ? theme.color('warning')
            : theme.color('success');

    return css`
        position: relative;
        display: block;
        padding: 2px 0 2px 12px;
        font-size: 0.9em;
        color: ${color};
    `;
};

export const materialStyledInput = (theme: Theme) => css`
    input {
        color: ${theme.color("textColor")};
        width: 100%;
        height: 3rem;
        border: none;
        border-bottom: solid 2px ${theme.color("secondary")};
        background-color: transparent;
        padding-left: 10px;
        font-size: ${theme.size("base")};
        transition: .1s ${EASE_FUNCTION};
        outline: none;
        box-sizing: border-box;
    }

    label {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
        transition: .2s ${EASE_FUNCTION};
        font-size: 1.2rem;
        pointer-events: none;
    }

    input:not(:placeholder-shown) ~ label,
    input:focus ~ label {
        top: 0px;
        left: 10px;
        font-size: 1rem;
    }

    & .underline {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        transform: scaleX(0);
        transition: transform 0.2s ${EASE_FUNCTION};
        border-bottom: 2px solid ${theme.color("secondary")};
    }

    input:focus ~ .underline {
        transform: scaleX(1);
    }

    input:hover {
        border-bottom: 2px solid ${theme.color("textColor")};
    }

    input:focus ~ label {
        color: ${theme.color("primary")} !important;
    }
`;

export const normalStyledInput = (theme: Theme) => css`
    background-color: inherit;

    input {
        color: ${theme.color("textColor")};
        height: 3rem;
        outline: 1px solid ${theme.color("secondary")};
        border-radius: ${theme.inputRadius};
        border: none;
        padding-left: 10px;
        font-size: ${theme.size("base")};
        transition: .1s ${EASE_FUNCTION};
        background: transparent;
        width: 100%;
    }

    label {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: ${theme.color("textColor")}80;
        background-color: inherit;
        text-align: center;
        transition: .2s ${EASE_FUNCTION};
        font-size: 1.2rem;
        pointer-events: none;
        padding: 0 5px;
    }

    input:not(:placeholder-shown) ~ label,
    input:focus ~ label {
        top: 0px;
        left: 10px;
        font-size: 1rem;
    }

    input:focus {
        outline: 1px solid ${theme.color("primary")} !important;
    }
    input:hover {
        outline: 1px solid ${theme.color("textColor")};
    }
    input:focus ~ label {
        color: ${theme.color("primary")} !important;
    }
`;