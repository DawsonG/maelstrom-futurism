import { css } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';

export const outsideContainer = css`
    background-color: inherit;
`;

export const fcContainer = css`
    position: relative;
    margin-top: 14px;
`;

export const rangeGroupContainer = css`
    display: flex;
    flex-direction: column;
    background-color: inherit;

    @media only screen and (min-width: 640px) {
        flex-direction: row;
        align-items: flex-start;
        gap: var(--mf-space-4);

        & > * {
            flex: 1;
            min-width: 0;
        }
    }
`;

export const dateInputStyle = css`
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
        color-scheme: light dark;
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

export const helpText = css`
    position: relative;
    display: block;
    padding: 2px 0 2px 12px;
    font-size: 0.9em;
    opacity: 0.7;
`;

export type ValidationState = 'alert' | 'warning' | 'success';

export const validationStyle = (state: ValidationState) => {
  const color = `var(--mf-${state})`;

  return css`
        input {
            outline: var(--mf-border-width-thin) solid ${color};
        }
        input:focus, input:hover {
            outline: var(--mf-border-width-thin) solid ${color};
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
