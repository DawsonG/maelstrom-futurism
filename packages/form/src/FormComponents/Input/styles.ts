import { css } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';
import { Variant } from './Input';

export const outsideContainer = css`
    background-color: inherit;
`;

export const fcContainer = css`
    position: relative;
    margin-top: 14px;
`;

export const fullWidthStyle = css`
    width: 100%;
    box-sizing: border-box;
`;

export const clearableInputStyle = css`
    input {
        padding-right: 2.25rem;
    }
`;

export const clearButton = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: none;
    font-size: 1.2rem;
    line-height: 1;
    color: var(--mf-text-muted);
    cursor: pointer;

    &:hover {
        color: var(--mf-text);
    }
`;

export const leadingIconStyle = css`
    input {
        padding-left: 2.25rem;
    }

    input:placeholder-shown ~ label {
        left: 2.25rem;
    }
`;

export const suffixIconStyle = css`
    input {
        padding-right: 2.25rem;
    }
`;

export const leadingIconSlot = css`
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--mf-text-muted);
    pointer-events: none;
`;

export const suffixIconSlot = css`
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: var(--mf-text-muted);
`;

export const suffixButton = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: none;
    font-size: 1.2rem;
    line-height: 1;
    color: var(--mf-text-muted);
    cursor: pointer;

    &:hover {
        color: var(--mf-text);
    }
`;

export const helpText = css`
    position: relative;
    display: block;
    padding: 2px 0 2px 12px;
    font-size: 0.9em;
    opacity: 0.7;
`;

export const characterCount = css`
    position: relative;
    display: block;
    padding: 2px 12px 2px 0;
    font-size: 0.9em;
    opacity: 0.7;
    text-align: right;
`;

export type ValidationState = 'alert' | 'warning' | 'success';

export const validationStyle = (state: ValidationState, variant: Variant) => {
  const color = `var(--mf-${state})`;

  let line = '';
  if (variant === 'normal') {
    line = `outline: var(--mf-border-width-thin) solid ${color}`;
  } else {
    line = `border-bottom: solid var(--mf-border-width-medium) ${color}`;
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

export const validationMessage = (state: ValidationState) => css`
    position: relative;
    display: block;
    padding: 2px 0 2px 12px;
    font-size: 0.9em;
    color: var(--mf-${state});
`;

export const materialStyledInput = css`
    input {
        color: var(--mf-text);
        width: 100%;
        height: 3rem;
        border: none;
        border-bottom: solid var(--mf-border-width-medium) var(--mf-secondary);
        background-color: transparent;
        padding-left: 10px;
        font-size: var(--mf-size-base);
        transition: var(--mf-dur-fast) ${EASE_FUNCTION};
        outline: none;
        box-sizing: border-box;
    }

    label {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: var(--mf-text-muted);
        text-align: center;
        transition: var(--mf-dur-normal) ${EASE_FUNCTION};
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
        transition: transform var(--mf-dur-normal) ${EASE_FUNCTION};
        border-bottom: var(--mf-border-width-medium) solid var(--mf-focus);
    }

    input:focus ~ .underline {
        transform: scaleX(1);
    }

    input:hover {
        border-bottom: var(--mf-border-width-medium) solid var(--mf-text);
    }

    input:focus ~ label {
        color: var(--mf-focus) !important;
    }
`;

export const normalStyledInput = css`
    background-color: inherit;

    input {
        color: var(--mf-text);
        height: 3rem;
        outline: var(--mf-border-width-thin) solid var(--mf-secondary);
        border-radius: var(--mf-radius-input);
        border: none;
        padding-left: 10px;
        font-size: var(--mf-size-base);
        transition: var(--mf-dur-fast) ${EASE_FUNCTION};
        background: transparent;
        width: 100%;
    }

    label {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: var(--mf-text-muted);
        background-color: inherit;
        text-align: center;
        transition: var(--mf-dur-normal) ${EASE_FUNCTION};
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
        outline: var(--mf-border-width-thin) solid var(--mf-focus) !important;
    }
    input:hover {
        outline: var(--mf-border-width-thin) solid var(--mf-text);
    }
    input:focus ~ label {
        color: var(--mf-focus) !important;
    }
`;
