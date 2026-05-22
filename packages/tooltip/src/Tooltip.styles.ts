import { css } from '@emotion/react';

const arrowBase = `
    content: '';
    position: absolute;
    border-style: solid;
    border-color: transparent;
`;

export const base = css`
    position: absolute;
    background-color: var(--mf-content);
    color: var(--mf-text);
    padding: 12px;
    border: 1px solid var(--mf-border-muted);
    border-radius: var(--mf-radius-card);
    z-index: var(--mf-z-high);
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity var(--mf-dur-fast) ease, visibility var(--mf-dur-fast) ease;
`;

export const visible = css`
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
`;

export const top = css`
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;

    &::before {
        ${arrowBase}
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 8px 8px 0;
        border-top-color: var(--mf-border-muted);
    }
    &::after {
        ${arrowBase}
        bottom: -7px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 7px 7px 0;
        border-top-color: var(--mf-content);
    }
`;

export const bottom = css`
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 8px;

    &::before {
        ${arrowBase}
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 8px 8px;
        border-bottom-color: var(--mf-border-muted);
    }
    &::after {
        ${arrowBase}
        top: -7px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 7px 7px;
        border-bottom-color: var(--mf-content);
    }
`;

export const left = css`
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 8px;

    &::before {
        ${arrowBase}
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 8px 0 8px 8px;
        border-left-color: var(--mf-border-muted);
    }
    &::after {
        ${arrowBase}
        right: -7px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 7px 0 7px 7px;
        border-left-color: var(--mf-content);
    }
`;

export const right = css`
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;

    &::before {
        ${arrowBase}
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 8px 8px 8px 0;
        border-right-color: var(--mf-border-muted);
    }
    &::after {
        ${arrowBase}
        left: -7px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 7px 7px 7px 0;
        border-right-color: var(--mf-content);
    }
`;
