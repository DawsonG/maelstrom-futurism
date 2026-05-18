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

export const helpText = css`
    position: relative;
    display: block;
    padding: 2px 0 2px 12px;
    font-size: 0.9em;
    opacity: 0.7;
`;

export type ValidationState = 'alert' | 'warning' | 'success';

export const validationStyle = (state: ValidationState, variant: Variant) => {
  const color = `var(--mf-${state})`;

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
        border-bottom: solid 2px var(--mf-secondary);
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
        border-bottom: 2px solid var(--mf-focus);
    }

    input:focus ~ .underline {
        transform: scaleX(1);
    }

    input:hover {
        border-bottom: 2px solid var(--mf-text);
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
        outline: 1px solid var(--mf-secondary);
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
        outline: 1px solid var(--mf-focus) !important;
    }
    input:hover {
        outline: 1px solid var(--mf-text);
    }
    input:focus ~ label {
        color: var(--mf-focus) !important;
    }
`;
