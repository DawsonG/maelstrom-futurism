import { css } from '@emotion/react';
import { EASE_FUNCTION } from '@maelstrom-futurism/core';

export const otpContainer = css`
    display: flex;
    gap: 8px;
`;

export const otpCell = css`
    width: 2.75rem;
    height: 3rem;
    border: none;
    outline: var(--mf-border-width-thin) solid var(--mf-secondary);
    border-radius: var(--mf-radius-input);
    background: transparent;
    color: var(--mf-text);
    font-size: 1.4rem;
    text-align: center;
    transition: outline-color var(--mf-dur-fast) ${EASE_FUNCTION};

    &:hover {
        outline-color: var(--mf-text);
    }

    &:focus {
        outline: var(--mf-border-width-thin) solid var(--mf-focus);
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;
